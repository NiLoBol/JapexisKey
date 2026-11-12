import crypto from 'node:crypto';

const SESSION_SECRET = process.env.SESSION_SECRET || 'change-me-session-secret';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';

export function sha256Hex(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

export function randomToken(bytes = 24, prefix = '') {
  const raw = crypto.randomBytes(bytes).toString('base64url');
  return prefix + raw.replace(/[^A-Za-z0-9]/g, '').slice(0, bytes * 2);
}

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(String(password), salt, 32).toString('hex');
  return `s1$${salt}$${hash}`;
}

export function verifyPassword(password, stored) {
  try {
    const parts = String(stored || '').split('$');
    if (parts.length !== 3) return false;
    const [, salt, hash] = parts;
    const test = crypto.scryptSync(String(password), salt, 32).toString('hex');
    const a = Buffer.from(hash, 'hex');
    const b = Buffer.from(test, 'hex');
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

function hmac(value, secret) {
  return crypto.createHmac('sha256', secret).update(value).digest('base64url');
}

function safeEqual(a, b) {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

export function signSession(userId, days = 7) {
  const exp = Date.now() + days * 86400000;
  const payload = `${userId}.${exp}`;
  return `${payload}.${hmac(payload, SESSION_SECRET)}`;
}

export function readSession(token) {
  if (!token) return null;
  const parts = String(token).split('.');
  if (parts.length !== 3) return null;
  const [uid, exp, sig] = parts;
  if (!uid || !exp || !sig) return null;
  if (hmac(`${uid}.${exp}`, SESSION_SECRET) !== sig) return null;
  if (Number(exp) < Date.now()) return null;
  const id = Number(uid);
  return Number.isFinite(id) && id > 0 ? id : null;
}

export function signAdmin() {
  const exp = Date.now() + 12 * 3600000;
  const payload = `admin.${exp}`;
  return `${payload}.${hmac(payload, ADMIN_TOKEN)}`;
}

export function readAdmin(token) {
  if (!token || !ADMIN_TOKEN) return false;
  const parts = String(token).split('.');
  if (parts.length !== 3) return false;
  const [who, exp, sig] = parts;
  if (who !== 'admin') return false;
  if (Number(exp) < Date.now()) return false;
  return safeEqual(sig, hmac(`admin.${exp}`, ADMIN_TOKEN));
}

export function checkAdminToken(token) {
  if (!ADMIN_TOKEN) return false;
  return safeEqual(token, ADMIN_TOKEN);
}

export function parseCookies(header) {
  const out = {};
  if (!header) return out;
  for (const part of String(header).split(';')) {
    const idx = part.indexOf('=');
    if (idx < 0) continue;
    const k = part.slice(0, idx).trim();
    const v = part.slice(idx + 1).trim();
    if (!k) continue;
    try {
      out[k] = decodeURIComponent(v);
    } catch {
      out[k] = v;
    }
  }
  return out;
}

export function makeOrderRef() {
  const now = Date.now().toString(36).toUpperCase().slice(-6);
  const rnd = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `JX${now}${rnd}`;
}
