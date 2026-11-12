import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 8,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

export function q(text, params) {
  return pool.query(text, params);
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  email text UNIQUE NOT NULL,
  pass_hash text NOT NULL,
  role text NOT NULL DEFAULT 'user',
  status text NOT NULL DEFAULT 'active',
  balance_thb numeric(14,6) NOT NULL DEFAULT 0,
  google_sub text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS api_keys (
  id serial PRIMARY KEY,
  user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT 'key',
  prefix text NOT NULL,
  key_hash text UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_used_at timestamptz,
  revoked boolean NOT NULL DEFAULT false
);
CREATE INDEX IF NOT EXISTS api_keys_user_idx ON api_keys(user_id);

CREATE TABLE IF NOT EXISTS plans (
  code text PRIMARY KEY,
  name text NOT NULL,
  price_thb numeric(10,2) NOT NULL,
  credit_thb numeric(10,2) NOT NULL,
  badge text,
  note text,
  sort int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS orders (
  id serial PRIMARY KEY,
  ref text UNIQUE NOT NULL,
  user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_code text NOT NULL,
  amount_thb numeric(10,2) NOT NULL,
  credit_thb numeric(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  payer_note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  paid_at timestamptz,
  approved_by text
);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status, created_at DESC);

CREATE TABLE IF NOT EXISTS ledger (
  id bigserial PRIMARY KEY,
  user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  delta_thb numeric(14,6) NOT NULL,
  reason text NOT NULL,
  ref text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ledger_user_idx ON ledger(user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS usage_logs (
  id bigserial PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  user_id int NOT NULL,
  api_key_id int,
  request_id text,
  model text,
  stream boolean NOT NULL DEFAULT false,
  status int NOT NULL DEFAULT 0,
  upstream_status int,
  prompt_tokens int NOT NULL DEFAULT 0,
  completion_tokens int NOT NULL DEFAULT 0,
  cache_read_tokens int NOT NULL DEFAULT 0,
  cache_write_tokens int NOT NULL DEFAULT 0,
  cost_thb numeric(14,6) NOT NULL DEFAULT 0,
  price_in_thb numeric(10,4),
  price_out_thb numeric(10,4),
  latency_ms int,
  ip text,
  estimated boolean NOT NULL DEFAULT false,
  error text
);
CREATE INDEX IF NOT EXISTS usage_user_time_idx ON usage_logs(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS usage_time_idx ON usage_logs(created_at DESC);

CREATE TABLE IF NOT EXISTS settings (
  key text PRIMARY KEY,
  value text
);

CREATE TABLE IF NOT EXISTS usage_daily (
  user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  day date NOT NULL,
  requests int NOT NULL DEFAULT 0,
  prompt_tokens bigint NOT NULL DEFAULT 0,
  completion_tokens bigint NOT NULL DEFAULT 0,
  cache_read_tokens bigint NOT NULL DEFAULT 0,
  cost_thb numeric(14,6) NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, day)
);
`;

const DEFAULT_SETTINGS = {
  promptpay_id: '',
  promptpay_name: 'JapexisKey',
  price_in_thb: '1.50',
  price_out_thb: '6.00',
  price_cache_read_thb: '0.03',
  price_cache_write_thb: '0',
  max_output_tokens: '8192',
  rate_limit_per_min: '30',
  public_model: 'deepseek-v4.1-flash',
  upstream_model: 'deepseek-v4.1-flash',
  welcome_credit_thb: '10',
};

const DEFAULT_PLANS = [
  ['A', 'A · ทดลอง', '10', '10', 'เริ่มต้น', 'ลองใช้ก่อน ไม่ต้องจ่ายเยอะ', 1],
  ['B', 'B · คุ้ม', '20', '22', '+10% เครดิต', 'จ่ายครั้งเดียว ใช้ได้นาน', 2],
  ['C', 'C · คุ้มสุด', '50', '60', '+20% เครดิต', 'ถูกที่สุดต่อบาท', 3],
];

export async function initDb() {
  await pool.query(SCHEMA);
  await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS google_sub text`);
  await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS name text`);
  await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS users_google_sub_key ON users (google_sub) WHERE google_sub IS NOT NULL`);
  const flag = await pool.query("SELECT value FROM settings WHERE key = 'usage_daily_backfilled'");
  if (!flag.rows.length) {
    await pool.query(`
      INSERT INTO usage_daily (user_id, day, requests, prompt_tokens, completion_tokens, cache_read_tokens, cost_thb)
      SELECT user_id, (created_at AT TIME ZONE 'Asia/Bangkok')::date,
             count(*)::int, coalesce(sum(prompt_tokens),0)::bigint, coalesce(sum(completion_tokens),0)::bigint,
             coalesce(sum(cache_read_tokens),0)::bigint, coalesce(sum(cost_thb),0)::numeric
        FROM usage_logs GROUP BY 1,2
      ON CONFLICT (user_id, day) DO UPDATE
        SET requests = EXCLUDED.requests,
            prompt_tokens = EXCLUDED.prompt_tokens,
            completion_tokens = EXCLUDED.completion_tokens,
            cache_read_tokens = EXCLUDED.cache_read_tokens,
            cost_thb = EXCLUDED.cost_thb
    `);
    await pool.query("INSERT INTO settings (key,value) VALUES ('usage_daily_backfilled','1') ON CONFLICT (key) DO NOTHING");
  }
  for (const [code, name, price, credit, badge, note, sort] of DEFAULT_PLANS) {
    await pool.query(
      `INSERT INTO plans (code, name, price_thb, credit_thb, badge, note, sort)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       ON CONFLICT (code) DO NOTHING`,
      [code, name, price, credit, badge, note, sort]
    );
  }
  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    await pool.query(
      `INSERT INTO settings (key, value) VALUES ($1,$2) ON CONFLICT (key) DO NOTHING`,
      [key, value]
    );
  }
}

export async function loadSettings() {
  const r = await pool.query('SELECT key, value FROM settings');
  const s = {};
  for (const row of r.rows) s[row.key] = row.value;
  return s;
}

export async function saveSettings(patch) {
  const keys = Object.keys(patch);
  for (const key of keys) {
    await pool.query(
      `INSERT INTO settings (key, value) VALUES ($1,$2)
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
      [key, String(patch[key])]
    );
  }
}

export async function getPlans() {
  const r = await pool.query('SELECT * FROM plans WHERE active = true ORDER BY sort ASC');
  return r.rows;
}
