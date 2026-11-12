import express from 'express';
import crypto from 'node:crypto';
import { pool, q, initDb, loadSettings, saveSettings, getPlans } from './lib/db.js';
import { sha256Hex, randomToken, hashPassword, verifyPassword, signSession, readSession, signAdmin, readAdmin, checkAdminToken, parseCookies, makeOrderRef } from './lib/auth.js';
import { promptPayPayload, qrSvg } from './lib/pay.js';
import * as V from './lib/views.js';

const PORT = Number(process.env.PORT || 3000);
const BASE_URL = (process.env.PUBLIC_BASE_URL || `http://localhost:${PORT}`).replace(/\/+$/, '');
const UPSTREAM_BASE_URL = (process.env.UPSTREAM_BASE_URL || 'https://amr-link.open-design.ai/v1').replace(/\/+$/, '');
const UPSTREAM_API_KEY = (process.env.UPSTREAM_API_KEY || '').trim();
const COOKIE_SECURE = process.env.COOKIE_SECURE === '0' ? '' : '; Secure';
const GOOGLE_CLIENT_ID = (process.env.GOOGLE_CLIENT_ID || '').trim();
const GOOGLE_CLIENT_SECRET = (process.env.GOOGLE_CLIENT_SECRET || '').trim();
const GOOGLE_REDIRECT = (process.env.GOOGLE_REDIRECT_URI || `${BASE_URL}/auth/google/callback`).trim();
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
const MODEL_ID = (process.env.MODEL_ID || 'deepseek-v4.1-flash').trim();

const app = express();
app.set('trust proxy', true);
app.disable('x-powered-by');
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: false, limit: '2mb' }));

let settings = {};

/* ---------- helpers ---------- */

const ah = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

function setCookie(res, name, value, maxAge = 7 * 86400) {
  const v = encodeURIComponent(String(value));
  res.append('Set-Cookie', `${name}=${v}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${COOKIE_SECURE}`);
}

function clearCookie(res, name) {
  res.append('Set-Cookie', `${name}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${COOKIE_SECURE}`);
}

function setFlash(res, message) {
  setCookie(res, 'jx_flash', message, 120);
}

function takeFlash(req, res) {
  const c = parseCookies(req.headers.cookie).jx_flash;
  if (c) clearCookie(res, 'jx_flash');
  return c || '';
}

async function currentUser(req) {
  const cookies = parseCookies(req.headers.cookie);
  const uid = readSession(cookies.jx_session);
  if (!uid) return null;
  const r = await q('SELECT id, email, name, role, status, balance_thb, created_at FROM users WHERE id = $1', [uid]);
  return r.rows[0] || null;
}

function requireLogin(req, res, next) {
  if (!req.user) {
    if (req.method === 'GET') return res.redirect('/login');
    return res.status(401).json({ error: { message: 'ต้องเข้าสู่ระบบก่อน', type: 'auth_error' } });
  }
  next();
}

function requireAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') return next();
  if (req.method === 'GET') {
    if (!req.user) return res.redirect('/login');
    return res.status(403).type('html').send(V.errorPage({ title: 'เฉพาะแอดมิน', message: 'บัญชีนี้ไม่มีสิทธิ์เข้าหน้านี้', code: 403, user: req.user }));
  }
  return res.status(403).json({ error: 'admin only' });
}

function priceTable() {
  return {
    in: Number(settings.price_in_thb || 1.5),
    out: Number(settings.price_out_thb || 6),
    cacheRead: Number(settings.price_cache_read_thb || 0.03),
  };
}

function googleEnabled() {
  return Boolean(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET);
}

function modelId() {
  return MODEL_ID || 'deepseek-v4.1-flash';
}

async function grantWelcome(client, userId) {
  const amount = Number(settings.welcome_credit_thb || 0);
  if (!(amount > 0)) return 0;
  await client.query('UPDATE users SET balance_thb = balance_thb + $2::numeric WHERE id = $1', [userId, amount]);
  await client.query('INSERT INTO ledger (user_id, delta_thb, reason) VALUES ($1,$2,$3)', [userId, amount, 'welcome']);
  return amount;
}

const signupHits = new Map();
function signupAllowed(ip) {
  const now = Date.now();
  let b = signupHits.get(ip);
  if (!b || now - b.start > 3600000) {
    b = { start: now, count: 0 };
    signupHits.set(ip, b);
  }
  b.count += 1;
  if (signupHits.size > 2000) {
    for (const [k, v] of signupHits) if (now - v.start > 3600000) signupHits.delete(k);
  }
  return b.count <= 5;
}

function apiError(res, status, message, type = 'invalid_request_error', code = null) {
  return res.status(status).json({ error: { message, type, code } });
}

function estTokens(text) {
  return Math.max(1, Math.round(String(text || '').length / 3.2));
}

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0].trim();
  return (req.ip || '').replace('::ffff:', '');
}

function rangeWhere(range) {
  if (range === '7') return "AND created_at > now() - interval '7 days'";
  if (range === '30') return "AND created_at > now() - interval '30 days'";
  return '';
}

/* ---------- usage logging ---------- */

async function recordUsage(opts) {
  const {
    user, key, reqId, model, stream, status, upstreamStatus, usage,
    fallbackIn = 0, fallbackOut = 0, latencyMs, ip, error,
  } = opts;
  const p = priceTable();
  let pt = 0, ct = 0, cr = 0, cw = 0, estimated = false;

  if (usage) {
    pt = Number(usage.prompt_tokens || 0);
    ct = Number(usage.completion_tokens || 0);
    const d = usage.prompt_tokens_details || {};
    cr = Number(d.cached_read_tokens || d.cached_tokens || 0);
    cw = Number(d.cached_write_tokens || 0);
  } else if (fallbackIn || fallbackOut) {
    estimated = true;
    pt = Math.round(fallbackIn);
    ct = Math.round(fallbackOut);
  }

  const billableIn = Math.max(0, pt - cr - cw);
  const cost = (billableIn * p.in + cr * p.cacheRead + ct * p.out) / 1000000;
  const costRounded = Math.round(cost * 1000000) / 1000000;

  const client = await pool.connect();
  let balance = Number(user.balance_thb || 0);
  try {
    await client.query('BEGIN');
    if (costRounded > 0) {
      await client.query('UPDATE users SET balance_thb = GREATEST(balance_thb - $2::numeric, 0) WHERE id = $1', [user.id, costRounded]);
    }
    await client.query(
      `INSERT INTO usage_logs
       (user_id, api_key_id, request_id, model, stream, status, upstream_status,
        prompt_tokens, completion_tokens, cache_read_tokens, cache_write_tokens,
        cost_thb, price_in_thb, price_out_thb, latency_ms, ip, estimated, error)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)`,
      [
        user.id, key ? key.id : null, reqId, model, Boolean(stream), status, upstreamStatus,
        pt, ct, cr, cw, costRounded, p.in, p.out, latencyMs, ip, estimated,
        error ? String(error).slice(0, 500) : null,
      ]
    );
    if (costRounded > 0) {
      await client.query('INSERT INTO ledger (user_id, delta_thb, reason, ref) VALUES ($1,$2,$3,$4)', [user.id, -costRounded, 'usage', reqId]);
    }
    const r = await client.query('SELECT balance_thb FROM users WHERE id = $1', [user.id]);
    balance = Number(r.rows[0].balance_thb);
    await client.query('COMMIT');
  } catch (err) {
    try { await client.query('ROLLBACK'); } catch { /* ignore */ }
    console.error('recordUsage failed', err);
  } finally {
    client.release();
  }
  return { cost: costRounded, balance };
}

/* ---------- in-memory rate limit ---------- */

const rlBuckets = new Map();
function rateLimitHit(keyId) {
  const limit = Math.max(1, Number(settings.rate_limit_per_min || 30));
  const now = Date.now();
  let b = rlBuckets.get(keyId);
  if (!b || now - b.start > 60000) {
    b = { start: now, count: 0 };
    rlBuckets.set(keyId, b);
  }
  b.count += 1;
  if (rlBuckets.size > 5000) {
    for (const [k, v] of rlBuckets) if (now - v.start > 60000) rlBuckets.delete(k);
  }
  return b.count <= limit;
}

/* ---------- request context ---------- */

app.use(ah(async (req, res, next) => {
  req.user = await currentUser(req);
  next();
}));

/* ---------- public pages ---------- */

app.get('/', ah(async (req, res) => {
  const plans = await getPlans();
  res.type('html').send(V.landing({ plans, prices: priceTable(), baseUrl: BASE_URL, google: googleEnabled(), model: modelId() }));
}));

app.get('/docs', ah(async (req, res) => {
  res.type('html').send(V.docsPage({ baseUrl: BASE_URL, model: modelId(), prices: priceTable() }));
}));

app.get('/stats', requireAdmin, ah(async (req, res) => {
  const t0 = Date.now();
  let dbOk = true;
  try { await q('SELECT 1'); } catch { dbOk = false; }
  let upstreamHost = 'ไม่ตั้งค่า';
  try { upstreamHost = new URL(UPSTREAM_BASE_URL).host; } catch { /* ignore */ }
  const plans = await getPlans();
  res.type('html').send(V.statsPage({
    health: { db: dbOk, dbMs: Date.now() - t0, upstreamConfigured: Boolean(UPSTREAM_API_KEY), upstreamHost },
    plans,
    settings,
    baseUrl: BASE_URL,
    user: req.user,
  }));
}));

app.get('/health', ah(async (req, res) => {
  try { await q('SELECT 1'); res.json({ ok: true, uptime: Math.round(process.uptime()), db: 'ok' }); } catch (e) { res.status(503).json({ ok: false, db: 'down' }); }
}));
app.get('/api/health', ah(async (req, res) => {
  try { await q('SELECT 1'); res.json({ ok: true, uptime: Math.round(process.uptime()), db: 'ok' }); } catch (e) { res.status(503).json({ ok: false, db: 'down' }); }
}));

/* ---------- auth pages (Google only) ---------- */

app.get('/signup', (req, res) => res.redirect('/login'));
app.post('/signup', (req, res) => res.redirect('/login'));

app.get('/login', (req, res) => {
  if (req.user) return res.redirect('/app');
  const notices = {
    off: 'Google login ยังไม่เปิด — แจ้งแอดมิน',
    state: 'เซสชัน Google หมดอายุ ลองอีกครั้ง',
    token: 'เชื่อมต่อ Google ไม่สำเร็จ ลองอีกครั้ง',
    profile: 'อ่านข้อมูลจาก Google ไม่ได้ ลองอีกครั้ง',
    email: 'บัญชี Google นี้ไม่มีอีเมล',
  };
  const notice = googleEnabled() ? (notices[String(req.query.google || '')] || '') : notices.off;
  res.type('html').send(V.authPage({ mode: 'login', google: googleEnabled(), notice }));
});
app.post('/login', (req, res) => res.redirect('/login'));

app.post('/logout', (req, res) => {
  clearCookie(res, 'jx_session');
  res.redirect('/');
});
app.get('/logout', (req, res) => {
  clearCookie(res, 'jx_session');
  res.redirect('/');
});

/* ---------- google sign-in ---------- */

app.get('/auth/google', (req, res) => {
  if (!googleEnabled()) return res.redirect('/login?google=off');
  const state = randomToken(12);
  setCookie(res, 'jx_oauth_state', state, 600);
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    prompt: 'select_account',
  });
  res.redirect('https://accounts.google.com/o/oauth2/v2/auth?' + params.toString());
});

app.get('/auth/google/callback', ah(async (req, res) => {
  if (!googleEnabled()) return res.redirect('/login?google=off');
  const cookies = parseCookies(req.headers.cookie);
  const state = String(req.query.state || '');
  if (!state || state !== cookies.jx_oauth_state) return res.redirect('/login?google=state');
  clearCookie(res, 'jx_oauth_state');
  if (!req.query.code) return res.redirect('/login?google=token');

  let token;
  try {
    const tr = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code: String(req.query.code),
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT,
        grant_type: 'authorization_code',
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!tr.ok) return res.redirect('/login?google=token');
    token = await tr.json();
  } catch {
    return res.redirect('/login?google=token');
  }

  let info;
  try {
    const ur = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: { Authorization: `Bearer ${token.access_token}` },
      signal: AbortSignal.timeout(20000),
    });
    if (!ur.ok) return res.redirect('/login?google=profile');
    info = await ur.json();
  } catch {
    return res.redirect('/login?google=profile');
  }

  const email = String(info.email || '').trim().toLowerCase();
  const sub = String(info.sub || '');
  if (!email || !sub) return res.redirect('/login?google=email');
  const isAdminEmail = Boolean(ADMIN_EMAIL) && email === ADMIN_EMAIL;
  const displayName = String(info.name || '').trim().slice(0, 80);

  const found = await q(
    'SELECT id, google_sub FROM users WHERE google_sub = $1 OR email = $2 ORDER BY (google_sub IS NOT NULL) DESC LIMIT 1',
    [sub, email]
  );

  let uid = 0;
  let isNew = false;
  let welcome = 0;
  let raw = '';
  if (found.rows.length) {
    uid = found.rows[0].id;
    if (!found.rows[0].google_sub) await q('UPDATE users SET google_sub = $2 WHERE id = $1', [uid, sub]);
    await q('UPDATE users SET role = $2 WHERE id = $1', [uid, isAdminEmail ? 'admin' : 'user']);
    if (displayName) await q('UPDATE users SET name = $2 WHERE id = $1', [uid, displayName]);
  } else {
    raw = 'JXK-' + randomToken(20);
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const ins = await client.query('INSERT INTO users (email, pass_hash, google_sub, role, name) VALUES ($1,$2,$3,$4,$5) RETURNING id', [email, '', sub, isAdminEmail ? 'admin' : 'user', displayName || null]);
      uid = ins.rows[0].id;
      await client.query('INSERT INTO api_keys (user_id, name, prefix, key_hash) VALUES ($1,$2,$3,$4)', [uid, 'default', raw.slice(0, 12), sha256Hex(raw)]);
      welcome = await grantWelcome(client, uid);
      await client.query('COMMIT');
      isNew = true;
    } catch (e) {
      try { await client.query('ROLLBACK'); } catch { /* ignore */ }
      const again = await q('SELECT id FROM users WHERE google_sub = $1 OR email = $2 LIMIT 1', [sub, email]);
      if (again.rows.length) {
        uid = again.rows[0].id;
        raw = '';
      } else {
        throw e;
      }
    } finally {
      client.release();
    }
  }

  if (!uid) return res.redirect('/login?google=token');
  if (isAdminEmail) await q("UPDATE users SET role = 'user' WHERE role = 'admin' AND email <> $1", [ADMIN_EMAIL]);
  setCookie(res, 'jx_session', signSession(uid));
  if (isNew && raw) setCookie(res, 'jx_newkey', raw, 300);
  if (isNew && welcome > 0) setFlash(res, `ยินดีต้อนรับ — ได้เครดิตทดลอง ฿${welcome.toFixed(0)} ใช้ได้เลย`);
  res.redirect('/app');
}));

/* ---------- dashboard ---------- */

app.get('/app', requireLogin, ah(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  const newKey = cookies.jx_newkey || null;
  if (newKey) clearCookie(res, 'jx_newkey');

  const keys = (await q('SELECT id, name, prefix, created_at, last_used_at, revoked FROM api_keys WHERE user_id = $1 ORDER BY id DESC', [req.user.id])).rows;
  const stats = (await q(
    `SELECT count(*)::int AS requests,
            coalesce(sum(prompt_tokens),0)::bigint AS pt,
            coalesce(sum(completion_tokens),0)::bigint AS ct,
            coalesce(sum(cache_read_tokens),0)::bigint AS cat,
            coalesce(sum(cache_write_tokens),0)::bigint AS cwt,
            coalesce(sum(cost_thb),0)::numeric AS cost
       FROM usage_logs WHERE user_id = $1 AND created_at > now() - interval '30 days'`,
    [req.user.id]
  )).rows[0];
  const recent = (await q(
    `SELECT created_at, model, status, prompt_tokens, completion_tokens, cache_read_tokens, cache_write_tokens, cost_thb, stream, estimated
       FROM usage_logs WHERE user_id = $1 ORDER BY id DESC LIMIT 8`, [req.user.id]
  )).rows;
  const orders = (await q(
    `SELECT ref, plan_code, amount_thb, credit_thb, status, created_at FROM orders
      WHERE user_id = $1 ORDER BY id DESC LIMIT 6`, [req.user.id]
  )).rows;

  res.type('html').send(V.dashPage({
    user: req.user,
    keys,
    newKey,
    stats: { requests: stats.requests, pt: stats.pt, ct: stats.ct, cost: stats.cost, cat: stats.cat },
    recent,
    orders,
    baseUrl: BASE_URL,
    model: modelId(),
    flash: takeFlash(req, res),
  }));
}));

app.post('/app/keys', requireLogin, ah(async (req, res) => {
  const raw = 'JXK-' + randomToken(20);
  await q('INSERT INTO api_keys (user_id, name, prefix, key_hash) VALUES ($1,$2,$3,$4)', [req.user.id, 'key', raw.slice(0, 12), sha256Hex(raw)]);
  setCookie(res, 'jx_newkey', raw, 300);
  setFlash(res, 'สร้างคีย์ใหม่แล้ว — คัดลอกเก็บไว้');
  res.redirect('/app');
}));

app.post('/app/keys/:id/revoke', requireLogin, ah(async (req, res) => {
  await q('UPDATE api_keys SET revoked = true WHERE id = $1 AND user_id = $2', [Number(req.params.id), req.user.id]);
  setFlash(res, 'เพิกถอนคีย์แล้ว');
  res.redirect('/app');
}));

/* ---------- buy / orders ---------- */

app.get('/buy', requireLogin, ah(async (req, res) => {
  const plans = await getPlans();
  res.type('html').send(V.buyPage({ plans, prices: priceTable(), user: req.user, flash: takeFlash(req, res), model: modelId() }));
}));

app.get('/buy/:code', requireLogin, ah(async (req, res) => {
  const plans = await getPlans();
  res.type('html').send(V.buyPage({ plans, prices: priceTable(), user: req.user, flash: '', model: modelId() }));
}));

app.post('/buy/:code', requireLogin, ah(async (req, res) => {
  const code = String(req.params.code || '').toUpperCase();
  const plan = (await q('SELECT * FROM plans WHERE code = $1 AND active = true', [code])).rows[0];
  if (!plan) return res.status(404).type('html').send(V.errorPage({ title: 'ไม่พบแผนนี้', message: 'เลือกแผน A, B หรือ C', code: 404, user: req.user }));
  const ref = makeOrderRef();
  await q(
    `INSERT INTO orders (ref, user_id, plan_code, amount_thb, credit_thb) VALUES ($1,$2,$3,$4,$5)`,
    [ref, req.user.id, plan.code, plan.price_thb, plan.credit_thb]
  );
  res.redirect(`/order/${ref}`);
}));

async function loadOrder(ref, userId, isAdmin = false) {
  const r = await q('SELECT * FROM orders WHERE ref = $1', [String(ref || '').toUpperCase()]);
  const order = r.rows[0];
  if (!order) return null;
  if (!isAdmin && order.user_id !== userId) return null;
  return order;
}

app.get('/order/:ref', requireLogin, ah(async (req, res) => {
  const isAdmin = Boolean(readAdmin(parseCookies(req.headers.cookie).jx_admin));
  const order = await loadOrder(req.params.ref, req.user.id, isAdmin);
  if (!order) return res.status(404).type('html').send(V.errorPage({ title: 'ไม่พบออเดอร์', message: 'เลขออเดอร์ไม่ถูกต้อง', code: 404, user: req.user }));
  let qr = null;
  if (String(settings.promptpay_id || '').trim()) {
    try {
      qr = await qrSvg(promptPayPayload(settings.promptpay_id, order.amount_thb, order.ref), 240);
    } catch (e) {
      qr = null;
      console.error('qr error', e.message);
    }
  }
  res.type('html').send(V.orderPage({ order, user: req.user, qr, settings, flash: takeFlash(req, res) }));
}));

app.post('/order/:ref/notify', requireLogin, ah(async (req, res) => {
  const order = await loadOrder(req.params.ref, req.user.id);
  if (!order) return res.status(404).type('html').send(V.errorPage({ title: 'ไม่พบออเดอร์', message: 'เลขออเดอร์ไม่ถูกต้อง', code: 404, user: req.user }));
  if (order.status === 'pending') {
    await q('UPDATE orders SET status = $1, payer_note = $2, updated_at = now() WHERE id = $3', ['review', String(req.body.note || '').slice(0, 200), order.id]);
    setFlash(res, 'แจ้งโอนแล้ว — รอแอดมินตรวจสอบ');
  }
  res.redirect(`/order/${order.ref}`);
}));

/* ---------- usage ---------- */

app.get('/app/usage', requireLogin, ah(async (req, res) => {
  const range = ['7', '30', 'all'].includes(String(req.query.range)) ? String(req.query.range) : '30';
  const where = rangeWhere(range);
  const stats = (await q(
    `SELECT count(*)::int AS requests,
            coalesce(sum(prompt_tokens),0)::bigint AS pt,
            coalesce(sum(completion_tokens),0)::bigint AS ct,
            coalesce(sum(cache_read_tokens),0)::bigint AS cat,
            coalesce(sum(cache_write_tokens),0)::bigint AS cwt,
            coalesce(sum(cost_thb),0)::numeric AS cost,
            count(*) FILTER (WHERE status >= 400)::int AS errors
       FROM usage_logs WHERE user_id = $1 ${where}`, [req.user.id]
  )).rows[0];
  const rows = (await q(
    `SELECT created_at, model, status, prompt_tokens, completion_tokens, cache_read_tokens, cache_write_tokens, cost_thb, latency_ms, stream, estimated
       FROM usage_logs WHERE user_id = $1 ${where} ORDER BY id DESC LIMIT 300`, [req.user.id]
  )).rows;
  res.type('html').send(V.usagePage({ user: req.user, stats, rows, range }));
}));

app.get('/app/usage.csv', requireLogin, ah(async (req, res) => {
  const range = ['7', '30', 'all'].includes(String(req.query.range)) ? String(req.query.range) : '30';
  const where = rangeWhere(range);
  const rows = (await q(
    `SELECT created_at, model, stream, status, prompt_tokens, completion_tokens, cache_read_tokens, cache_write_tokens, cost_thb, latency_ms, estimated, error
       FROM usage_logs WHERE user_id = $1 ${where} ORDER BY id DESC`, [req.user.id]
  )).rows;
  const cols = [
    ['created_at', 'เวลา'], ['model', 'โมเดล'], ['stream', 'สตรีม'], ['status', 'HTTP'],
    ['prompt_tokens', 'โทเคนเข้า'], ['completion_tokens', 'โทเคนออก'],
    ['cache_read_tokens', 'โทเคนจากแคช'],
    ['cost_thb', 'ค่าใช้จ่าย (บาท)'], ['latency_ms', 'เวลาตอบ (ms)'], ['estimated', 'ประมาณการ'],
  ];
  const header = cols.map((c) => c[1]).join(',');
  const lines = rows.map((r) => cols.map((c) => {
    let v = c[0] === 'created_at' ? V.dt(r[c[0]]) : r[c[0]];
    if (c[0] === 'stream' || c[0] === 'estimated') v = r[c[0]] ? 'ใช่' : 'ไม่ใช่';
    if (v === null || v === undefined) v = '';
    return `"${String(v).replace(/"/g, '""')}"`;
  }).join(','));
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="japexisk-usage-${range}-${Date.now()}.csv"`);
  res.send('\uFEFF' + header + '\n' + lines.join('\n') + (lines.length ? '\n' : ''));
}));

/* ---------- admin ---------- */

app.get('/admin/login', (req, res) => res.redirect('/login'));
app.post('/admin/login', (req, res) => res.redirect('/login'));

app.post('/admin/logout', (req, res) => {
  clearCookie(res, 'jx_session');
  res.redirect('/');
});

app.get('/admin', requireAdmin, ah(async (req, res) => {
  const pending = (await q(
    `SELECT o.*, u.email FROM orders o JOIN users u ON u.id = o.user_id
      WHERE o.status IN ('pending','review') ORDER BY o.id DESC LIMIT 100`
  )).rows;
  const paid = (await q(
    `SELECT o.*, u.email FROM orders o JOIN users u ON u.id = o.user_id
      WHERE o.status = 'paid' ORDER BY o.paid_at DESC LIMIT 20`
  )).rows;
  const rows = (await q(
    `SELECT l.created_at, l.status, l.prompt_tokens, l.completion_tokens, l.cache_read_tokens, l.cost_thb, u.email
       FROM usage_logs l JOIN users u ON u.id = l.user_id ORDER BY l.id DESC LIMIT 30`
  )).rows;
  const totals = (await q(
    `SELECT (SELECT count(*) FROM users)::int AS users,
            (SELECT coalesce(sum(balance_thb),0) FROM users)::numeric AS balance,
            (SELECT coalesce(sum(amount_thb),0) FROM orders WHERE status='paid')::numeric AS revenue,
            (SELECT coalesce(sum(cost_thb),0) FROM usage_logs WHERE created_at > now() - interval '30 days')::numeric AS cost30`
  )).rows[0];
  res.type('html').send(V.adminHome({ pending, paid, rows, totals, flash: takeFlash(req, res), user: req.user }));
}));

app.post('/admin/orders/:id/approve', requireAdmin, ah(async (req, res) => {
  const id = Number(req.params.id);
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const o = (await client.query('SELECT * FROM orders WHERE id = $1 FOR UPDATE', [id])).rows[0];
    if (!o) {
      await client.query('ROLLBACK');
      setFlash(res, 'ไม่พบออเดอร์');
      return res.redirect('/admin');
    }
    if (o.status === 'paid') {
      await client.query('ROLLBACK');
      setFlash(res, 'ออเดอร์นี้ชำระแล้ว');
      return res.redirect('/admin');
    }
    await client.query(`UPDATE orders SET status='paid', paid_at=now(), updated_at=now(), approved_by='admin' WHERE id=$1`, [id]);
    await client.query('UPDATE users SET balance_thb = balance_thb + $2 WHERE id = $1', [o.user_id, o.credit_thb]);
    await client.query('INSERT INTO ledger (user_id, delta_thb, reason, ref) VALUES ($1,$2,$3,$4)', [o.user_id, o.credit_thb, 'topup:' + o.plan_code, o.ref]);
    await client.query('COMMIT');
    setFlash(res, `อนุมัติ ${o.ref} — เพิ่มเครดิต ฿${Number(o.credit_thb).toFixed(2)}`);
  } catch (e) {
    try { await client.query('ROLLBACK'); } catch { /* ignore */ }
    console.error('approve failed', e.message);
    setFlash(res, 'อนุมัติไม่สำเร็จ: ' + e.message);
  } finally {
    client.release();
  }
  res.redirect('/admin');
}));

app.post('/admin/orders/:id/reject', requireAdmin, ah(async (req, res) => {
  await q(`UPDATE orders SET status='cancelled', updated_at=now() WHERE id=$1 AND status IN ('pending','review')`, [Number(req.params.id)]);
  setFlash(res, 'ยกเลิกออเดอร์แล้ว');
  res.redirect('/admin');
}));

app.get('/admin/users', requireAdmin, ah(async (req, res) => {
  const users = (await q(
    `SELECT u.id, u.email, u.balance_thb, u.created_at, u.role, u.status,
            (SELECT count(*) FROM usage_logs l WHERE l.user_id = u.id)::int AS requests,
            (SELECT coalesce(sum(cost_thb),0) FROM usage_logs l WHERE l.user_id = u.id)::numeric AS spent
       FROM users u ORDER BY u.id DESC LIMIT 200`
  )).rows;
  res.type('html').send(V.adminUsers({ users, flash: takeFlash(req, res), user: req.user }));
}));

app.post('/admin/users/:id/credit', requireAdmin, ah(async (req, res) => {
  const uid = Number(req.params.id);
  const amount = Number(String(req.body.amount || '').replace(',', '.'));
  const note = String(req.body.note || 'manual').slice(0, 100);
  if (!Number.isFinite(amount) || amount === 0) {
    setFlash(res, 'จำนวนเงินไม่ถูกต้อง');
    return res.redirect('/admin/users');
  }
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('UPDATE users SET balance_thb = GREATEST(balance_thb + $2::numeric, 0) WHERE id = $1', [uid, amount]);
    await client.query('INSERT INTO ledger (user_id, delta_thb, reason) VALUES ($1,$2,$3)', [uid, amount, note]);
    await client.query('COMMIT');
    setFlash(res, `ปรับเครดิต ${amount > 0 ? '+' : ''}฿${amount.toFixed(2)} แล้ว`);
  } catch (e) {
    try { await client.query('ROLLBACK'); } catch { /* ignore */ }
    setFlash(res, 'ปรับไม่สำเร็จ: ' + e.message);
  } finally {
    client.release();
  }
  res.redirect('/admin/users');
}));

app.get('/admin/settings', requireAdmin, (req, res) => {
  res.type('html').send(V.adminSettings({ settings, flash: takeFlash(req, res), user: req.user, model: modelId() }));
});

app.post('/admin/settings', requireAdmin, ah(async (req, res) => {
  const allowed = ['promptpay_id', 'promptpay_name', 'price_in_thb', 'price_out_thb', 'price_cache_read_thb', 'welcome_credit_thb', 'max_output_tokens', 'rate_limit_per_min'];
  const patch = {};
  for (const key of allowed) {
    if (req.body[key] === undefined) continue;
    let value = String(req.body[key]).trim();
    if (key === 'promptpay_id') value = value.replace(/[^0-9]/g, '');
    if (key.startsWith('price_') || key === 'max_output_tokens' || key === 'rate_limit_per_min' || key === 'welcome_credit_thb') {
      const num = Number(value.replace(',', '.'));
      if (!Number.isFinite(num) || num < 0) continue;
      value = String(num);
    }
    patch[key] = value.slice(0, 200);
  }
  await saveSettings(patch);
  settings = await loadSettings();
  setFlash(res, 'บันทึกการตั้งค่าแล้ว');
  res.redirect('/admin/settings');
}));

app.get('/admin/usage', requireAdmin, ah(async (req, res) => {
  const rows = (await q(
    `SELECT l.created_at, l.model, l.stream, l.status, l.prompt_tokens, l.completion_tokens,
            l.cache_read_tokens, l.cache_write_tokens, l.cost_thb, l.ip, l.error, l.estimated, u.email
       FROM usage_logs l JOIN users u ON u.id = l.user_id ORDER BY l.id DESC LIMIT 300`
  )).rows;
  const totals = (await q(
    `SELECT count(*)::int AS requests,
            coalesce(sum(prompt_tokens),0)::bigint AS pt,
            coalesce(sum(completion_tokens),0)::bigint AS ct,
            coalesce(sum(cost_thb),0)::numeric AS cost,
            count(*) FILTER (WHERE status >= 400)::int AS errors
       FROM usage_logs WHERE created_at > now() - interval '30 days'`
  )).rows[0];
  res.type('html').send(V.adminUsage({ rows, totals, flash: takeFlash(req, res), user: req.user }));
}));

app.get('/admin/usage.csv', requireAdmin, ah(async (req, res) => {
  const rows = (await q(
    `SELECT l.created_at, u.email, l.model, l.stream, l.status, l.prompt_tokens, l.completion_tokens,
            l.cache_read_tokens, l.cache_write_tokens, l.cost_thb, l.latency_ms, l.estimated, l.ip, l.error
       FROM usage_logs l JOIN users u ON u.id = l.user_id ORDER BY l.id DESC LIMIT 10000`
  )).rows;
  const cols = [
    ['created_at', 'เวลา'], ['email', 'ผู้ใช้'], ['model', 'โมเดล'], ['stream', 'สตรีม'], ['status', 'HTTP'],
    ['prompt_tokens', 'โทเคนเข้า'], ['completion_tokens', 'โทเคนออก'],
    ['cache_read_tokens', 'โทเคนจากแคช'],
    ['cost_thb', 'ค่าใช้จ่าย (บาท)'], ['latency_ms', 'เวลาตอบ (ms)'], ['estimated', 'ประมาณการ'], ['ip', 'IP'], ['error', 'error'],
  ];
  const header = cols.map((c) => c[1]).join(',');
  const lines = rows.map((r) => cols.map((c) => {
    let v = c[0] === 'created_at' ? V.dt(r[c[0]]) : r[c[0]];
    if (c[0] === 'stream' || c[0] === 'estimated') v = r[c[0]] ? 'ใช่' : 'ไม่ใช่';
    if (v === null || v === undefined) v = '';
    return `"${String(v).replace(/"/g, '""')}"`;
  }).join(','));
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="japexisk-admin-usage-${Date.now()}.csv"`);
  res.send('\uFEFF' + header + '\n' + lines.join('\n') + (lines.length ? '\n' : ''));
}));

/* ---------- OpenAI-compatible API ---------- */

app.use('/v1', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type, OpenAI-Organization, OpenAI-Project');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

async function apiAuth(req, res, next) {
  try {
    const header = String(req.headers.authorization || '');
    const m = header.match(/^Bearer\s+(.+)$/i);
    if (!m) return apiError(res, 401, 'ต้องส่ง Authorization: Bearer <คีย์>', 'authentication_error', 'missing_api_key');
    const raw = m[1].trim();
    const r = await q(
      `SELECT k.id AS key_id, k.revoked, u.id AS user_id, u.email, u.status, u.balance_thb
         FROM api_keys k JOIN users u ON u.id = k.user_id WHERE k.key_hash = $1`, [sha256Hex(raw)]
    );
    if (!r.rows.length) return apiError(res, 401, 'คีย์ไม่ถูกต้อง', 'authentication_error', 'invalid_api_key');
    const row = r.rows[0];
    if (row.revoked) return apiError(res, 401, 'คีย์นี้ถูกเพิกถอนแล้ว', 'authentication_error', 'revoked_api_key');
    if (row.status !== 'active') return apiError(res, 403, 'บัญชีถูกระงับ', 'permission_error', 'user_suspended');
    req.api = {
      key: { id: row.key_id },
      user: { id: row.user_id, email: row.email, status: row.status, balance_thb: row.balance_thb },
      raw,
    };
    q('UPDATE api_keys SET last_used_at = now() WHERE id = $1', [row.key_id]).catch(() => {});
    next();
  } catch (e) {
    next(e);
  }
}

app.get('/v1/models', apiAuth, (req, res) => {
  const id = modelId();
  res.json({
    object: 'list',
    data: [{
      id,
      object: 'model',
      created: 1793956597,
      owned_by: 'japexisk',
    }],
  });
});

app.get('/v1/me', apiAuth, ah(async (req, res) => {
  const u = req.api.user;
  const s = (await q(
    `SELECT count(*)::int AS requests,
            coalesce(sum(prompt_tokens),0)::bigint AS prompt_tokens,
            coalesce(sum(completion_tokens),0)::bigint AS completion_tokens,
            coalesce(sum(cache_read_tokens),0)::bigint AS cache_read_tokens,
            coalesce(sum(cache_write_tokens),0)::bigint AS cache_write_tokens,
            coalesce(sum(cost_thb),0)::numeric AS cost_thb
       FROM usage_logs WHERE user_id = $1 AND created_at > now() - interval '30 days'`, [u.id]
  )).rows[0];
  const fresh = (await q('SELECT balance_thb FROM users WHERE id = $1', [u.id])).rows[0];
  res.json({
    account: u.email,
    balance_thb: Number(fresh.balance_thb),
    model: modelId(),
    usage_30d: {
      requests: s.requests,
      prompt_tokens: Number(s.prompt_tokens),
      completion_tokens: Number(s.completion_tokens),
      cache_read_tokens: Number(s.cache_read_tokens),
      cost_thb: Number(s.cost_thb),
    },
    prices_per_1m: priceTable(),
  });
}));

app.get('/v1/usage', apiAuth, ah(async (req, res) => {
  const rows = (await q(
    `SELECT created_at, model, stream, status, prompt_tokens, completion_tokens, cache_read_tokens,
            cache_write_tokens, cost_thb, latency_ms, estimated
       FROM usage_logs WHERE user_id = $1 ORDER BY id DESC LIMIT $2`,
    [req.api.user.id, Math.min(200, Number(req.query.limit) || 50)]
  )).rows;
  res.json({ object: 'list', data: rows });
}));

app.post('/v1/chat/completions', apiAuth, ah(async (req, res) => {
  const started = Date.now();
  const { user, key } = req.api;
  const reqId = 'jxk-' + crypto.randomBytes(8).toString('hex');
  const ip = clientIp(req);
  const body = req.body || {};
  const p = priceTable();
  const publicModel = modelId();
  const upstreamModel = modelId();
  const allowedModels = [publicModel, 'deepseek-eco', 'deepseek-v4.1-flash-eco'];
  const stream = body.stream === true;
  const requested = String(body.model || '');

  if (requested && !allowedModels.includes(requested)) {
    return apiError(res, 404, `โมเดล "${requested}" ไม่เปิดให้ใช้ — ใช้ "${publicModel}" เท่านั้น`, 'model_not_found', 'model_not_found');
  }
  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return apiError(res, 400, 'ต้องมี messages อย่างน้อย 1 รายการ', 'invalid_request_error', 'invalid_messages');
  }
  if (!rateLimitHit(key.id)) {
    return apiError(res, 429, `เรียกใช้งานถี่เกินกำหนด (${settings.rate_limit_per_min || 30} ครั้ง/นาที) — ลองใหม่ภายหลัง`, 'rate_limit_error', 'rate_limit_exceeded');
  }
  if (!UPSTREAM_API_KEY) {
    return apiError(res, 503, 'ระบบไม่พร้อมให้บริการชั่วคราว — ลองใหม่ภายหลัง', 'api_error', 'service_unavailable');
  }
  const balanceNow = Number((await q('SELECT balance_thb FROM users WHERE id = $1', [user.id])).rows[0].balance_thb);
  if (balanceNow <= 0) {
    await recordUsage({
      user, key, reqId, model: publicModel, stream, status: 402, upstreamStatus: null,
      fallbackIn: 0, fallbackOut: 0, latencyMs: Date.now() - started, ip, error: 'insufficient credit',
    });
    return apiError(res, 402, 'เครดิตหมด — เติมที่หน้า /buy', 'insufficient_quota', 'insufficient_quota');
  }

  const maxOut = Math.min(
    Number(body.max_tokens || body.max_completion_tokens || 4096) || 4096,
    Number(settings.max_output_tokens || 8192)
  );
  const payload = { ...body, model: upstreamModel, max_tokens: maxOut };
  delete payload.max_completion_tokens;
  delete payload.stream_options;
  if (stream) payload.stream_options = { include_usage: true };

  const fallbackIn = estTokens(JSON.stringify(body.messages));
  let upstream;
  try {
    upstream = await fetch(`${UPSTREAM_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${UPSTREAM_API_KEY}`,
        'Content-Type': 'application/json',
        Accept: stream ? 'text/event-stream' : 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(300000),
    });
  } catch (e) {
    const info = await recordUsage({
      user, key, reqId, model: publicModel, stream, status: 502, upstreamStatus: null,
      fallbackIn: 0, fallbackOut: 0, latencyMs: Date.now() - started, ip, error: e.message,
    });
    return apiError(res, 502, 'เชื่อมต่อระบบไม่สำเร็จ — ลองใหม่ภายหลัง', 'api_error', 'upstream_unreachable');
  }

  if (!upstream.ok && !stream) {
    const text = await upstream.text();
    let msg = text.slice(0, 300);
    try {
      const j = JSON.parse(text);
      msg = j.error?.message || j.message || msg;
    } catch { /* ignore */ }
    const status = upstream.status === 429 ? 429 : (upstream.status >= 500 ? 502 : 400);
    await recordUsage({
      user, key, reqId, model: publicModel, stream, status,
      upstreamStatus: upstream.status, latencyMs: Date.now() - started, ip,
      error: `upstream ${upstream.status}: ${msg}`,
    });
    return apiError(res, status, msg || `ต้นทางตอบ ${upstream.status}`, 'upstream_error', 'upstream_error');
  }

  if (stream) {
    if (!upstream.ok) {
      const text = await upstream.text();
      let msg = text.slice(0, 300);
      try { msg = JSON.parse(text).error?.message || msg; } catch { /* ignore */ }
      const status = upstream.status === 429 ? 429 : (upstream.status >= 500 ? 502 : 400);
      await recordUsage({
        user, key, reqId, model: publicModel, stream: true, status,
        upstreamStatus: upstream.status, latencyMs: Date.now() - started, ip,
        error: `upstream ${upstream.status}: ${msg}`,
      });
      return apiError(res, status, msg || `ต้นทางตอบ ${upstream.status}`, 'upstream_error', 'upstream_error');
    }

    res.status(200);
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders();
    let closed = false;
    res.on('close', () => { closed = true; });

    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    let usage = null;
    let outText = '';
    try {
      for await (const chunk of upstream.body) {
        const text = decoder.decode(chunk, { stream: true });
        if (!closed && !res.writableEnded) res.write(text);
        buffer += text;
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        for (const line of lines) {
          const t = line.trim();
          if (!t.startsWith('data:')) continue;
          const data = t.slice(5).trim();
          if (data === '[DONE]') continue;
          try {
            const j = JSON.parse(data);
            if (j.usage) usage = j.usage;
            const piece = j.choices?.[0]?.delta?.content;
            if (piece) outText += piece;
          } catch { /* partial or non-json */ }
        }
      }
      const tail = decoder.decode();
      if (tail && !closed && !res.writableEnded) res.write(tail);
      if (!closed && !res.writableEnded) res.end();
    } catch (e) {
      console.error('stream error', e.message);
      if (!closed && !res.writableEnded) res.end();
    }

    await recordUsage({
      user, key, reqId, model: publicModel, stream: true, status: 200,
      upstreamStatus: upstream.status, usage,
      fallbackIn: usage ? 0 : fallbackIn, fallbackOut: usage ? 0 : estTokens(outText),
      latencyMs: Date.now() - started, ip,
    });
    console.log(`[japexisk] stream done ${reqId} in=${usage?.prompt_tokens ?? 'est'} out=${usage?.completion_tokens ?? 'est'}`);
    return;
  }

  const text = await upstream.text();
  let json = null;
  try { json = JSON.parse(text); } catch { /* ignore */ }
  if (!json) {
    await recordUsage({
      user, key, reqId, model: publicModel, stream: false, status: 502,
      upstreamStatus: upstream.status, latencyMs: Date.now() - started, ip,
      error: 'invalid json from upstream: ' + text.slice(0, 200),
    });
    return apiError(res, 502, 'ต้นทางตอบรูปแบบไม่ถูกต้อง', 'api_error', 'invalid_upstream_response');
  }
  const info = await recordUsage({
    user, key, reqId, model: publicModel, stream: false, status: 200,
    upstreamStatus: upstream.status, usage: json.usage || null,
    fallbackIn: json.usage ? 0 : fallbackIn, fallbackOut: 0,
    latencyMs: Date.now() - started, ip,
  });
  res.setHeader('X-JapexisKey-Cost', info.cost.toFixed(6));
  res.setHeader('X-JapexisKey-Balance', Number(info.balance).toFixed(6));
  res.status(upstream.status).json(json);
}));

/* ---------- 404 + errors ---------- */

app.use((req, res, next) => {
  if (req.path.startsWith('/v1/')) return apiError(res, 404, 'endpoint not found', 'invalid_request_error', 'not_found');
  res.status(404).type('html').send(V.errorPage({ title: 'ไม่พบหน้านี้', message: 'ลิงก์อาจเปลี่ยนหรือพิมพ์ผิด', code: 404, user: req.user }));
});

app.use((err, req, res, next) => {
  console.error('ERROR', req.method, req.path, err.message);
  if (req.path.startsWith('/v1/')) {
    return apiError(res, 500, 'เกิดข้อผิดพลาดชั่วคราว — ลองใหม่อีกครั้ง', 'api_error', 'internal_error');
  }
  res.status(500).type('html').send(V.errorPage({ title: 'เกิดข้อผิดพลาด', message: 'ลองใหม่อีกครั้ง หรือติดต่อทีมงาน', code: 500, user: req.user }));
});

/* ---------- boot ---------- */

async function main() {
  await initDb();
  settings = await loadSettings();
  console.log(`[japexisk] booted · base=${BASE_URL} · upstream=${UPSTREAM_BASE_URL} · key=${UPSTREAM_API_KEY ? 'set' : 'MISSING'}`);
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[japexisk] listening on :${PORT}`);
  });
}

process.on('SIGTERM', async () => {
  console.log('[japexisk] SIGTERM — closing');
  try { await pool.end(); } catch { /* ignore */ }
  process.exit(0);
});

main().catch((e) => {
  console.error('BOOT FAILED', e);
  process.exit(1);
});
