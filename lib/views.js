// Server-rendered HTML (no framework, no build step)
const CSS = `
*{box-sizing:border-box}
html{color-scheme:dark}
body{margin:0;background:#070b11;color:#e8eef6;font-family:"Noto Sans Thai","IBM Plex Sans Thai",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;font-size:15px;line-height:1.55;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
img,svg{max-width:100%}
.wrap{max-width:1080px;margin:0 auto;padding:0 18px}
header.site{position:sticky;top:0;z-index:20;background:rgba(7,11,17,.82);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-bottom:1px solid #141e2b}
.nav{display:flex;align-items:center;gap:16px;height:58px}
.brand{display:flex;align-items:center;gap:9px;font-weight:800;letter-spacing:-.3px;font-size:16px}
.logo{width:26px;height:26px;border-radius:8px;background:linear-gradient(135deg,#37e0b0,#6aa8ff);display:grid;place-items:center;color:#04121a;font-size:13px;font-weight:900;flex:none}
.nav-links{display:none;gap:20px;color:#9fb0c6;font-size:14px}
@media(min-width:760px){.nav-links{display:flex}}
.right{margin-left:auto;display:flex;align-items:center;gap:10px}
.balance-pill{font-size:13px;border:1px solid #1d2b3c;background:#0e1622;padding:5px 10px;border-radius:999px;color:#9fe9cf;white-space:nowrap}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:1px solid #24344a;background:#101a28;color:#e8eef6;padding:9px 15px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:transform .12s ease,border-color .12s ease,background .12s ease}
.btn:hover{transform:translateY(-1px);border-color:#35507a}
.btn.primary{background:linear-gradient(135deg,#29d9a8,#31bfe0);border-color:transparent;color:#04121a}
.btn.primary:hover{filter:brightness(1.06)}
.btn.ghost{background:transparent}
.btn.danger{border-color:#5a2430;color:#ff9aa6;background:#1a0f13}
.btn.big{padding:12px 20px;font-size:15px;border-radius:12px}
.btn.sm{padding:5px 10px;font-size:12.5px;border-radius:8px}
.hero{padding:54px 0 26px}
.pill{display:inline-flex;align-items:center;gap:8px;font-size:12.5px;color:#9fe9cf;border:1px solid #17382f;background:#0c1c19;padding:5px 11px;border-radius:999px;margin-bottom:16px}
.dot{width:6px;height:6px;border-radius:50%;background:#37e0b0;box-shadow:0 0 10px #37e0b0}
h1{font-size:clamp(28px,6.4vw,46px);line-height:1.15;letter-spacing:-1px;margin:0 0 14px;font-weight:800}
.grad{background:linear-gradient(100deg,#37e0b0 0%,#6aa8ff 60%,#a78bfa 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.lead{color:#9fb0c6;font-size:16px;max-width:620px;margin:0 0 22px}
.cta{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:18px}
.chips{display:flex;flex-wrap:wrap;gap:8px;color:#8fa1b6;font-size:12.5px}
.chip{border:1px solid #1b2837;background:#0c141e;padding:4px 9px;border-radius:8px}
section{padding:26px 0}
h2{font-size:22px;margin:0 0 6px;letter-spacing:-.4px}
.sub{color:#8fa1b6;margin:0 0 18px;font-size:14px}
.plans{display:grid;grid-template-columns:1fr;gap:12px}
@media(min-width:700px){.plans{grid-template-columns:repeat(3,1fr)}}
.card{background:linear-gradient(180deg,#0f1723,#0c131d);border:1px solid #1a2636;border-radius:16px;padding:18px}
.plan{display:flex;flex-direction:column;gap:10px;position:relative}
.plan .name{font-weight:700;font-size:15px;color:#cfe0f2}
.plan .price{font-size:34px;font-weight:800;letter-spacing:-1px}
.plan .price small{font-size:14px;font-weight:600;color:#8fa1b6;margin-left:4px}
.plan .credit{font-size:13px;color:#9fe9cf}
.plan .note{font-size:12.5px;color:#7f92a8;min-height:34px}
.badge{position:absolute;top:14px;right:14px;font-size:11px;padding:3px 8px;border-radius:999px;background:#12291f;border:1px solid #1d4a37;color:#8ff0cc}
.card .btn{margin-top:auto;width:100%}
.kpis{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
@media(min-width:700px){.kpis{grid-template-columns:repeat(4,1fr)}}
.kpi{background:#0d1520;border:1px solid #182333;border-radius:12px;padding:12px 14px}
.kpi .k{font-size:11.5px;color:#7f92a8;text-transform:uppercase;letter-spacing:.4px}
.kpi .v{font-size:19px;font-weight:700;margin-top:3px;letter-spacing:-.4px}
.kpi .u{font-size:12px;color:#7f92a8}
.mono{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.codebox{position:relative;background:#0a121c;border:1px solid #1a2636;border-radius:12px;overflow:hidden;margin:10px 0}
.codebox .copy{position:absolute;top:8px;right:8px}
pre.code{margin:0;padding:14px 14px;overflow-x:auto;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12.5px;line-height:1.6;color:#cfe0f2;white-space:pre}
.tbl-wrap{overflow-x:auto;border:1px solid #182333;border-radius:12px;background:#0c141e}
table.tbl{width:100%;border-collapse:collapse;font-size:13px;white-space:nowrap}
.tbl th{text-align:left;color:#7f92a8;font-weight:600;font-size:11.5px;text-transform:uppercase;letter-spacing:.4px;padding:10px 12px;border-bottom:1px solid #182333;background:#0b131d}
.tbl td{padding:9px 12px;border-bottom:1px solid #111a26;color:#d5e2f0}
.tbl tr:last-child td{border-bottom:none}
.tbl td.num,.tbl th.num{text-align:right;font-variant-numeric:tabular-nums}
.tbl tfoot td{border-top:1px solid #223247;color:#9fe9cf;font-weight:600;background:#0b131d}
.status{padding:2px 8px;border-radius:999px;font-size:11.5px;border:1px solid}
.s-ok{color:#8ff0cc;background:#0e2019;border-color:#1c4234}
.s-err{color:#ff9aa6;background:#1c1014;border-color:#4a2029}
.s-warn{color:#ffd08a;background:#1d1710;border-color:#4a3620}
.input,textarea,select{width:100%;background:#0a121c;border:1px solid #22334a;color:#e8eef6;padding:10px 12px;border-radius:10px;font-size:14px;font-family:inherit}
.input:focus,textarea:focus,select:focus{outline:none;border-color:#37e0b0}
label.lbl{display:block;font-size:12.5px;color:#8fa1b6;margin:12px 0 5px}
.form{max-width:430px}
.form .btn{margin-top:16px;width:100%}
.flash{border-radius:10px;padding:10px 13px;font-size:13.5px;margin:12px 0;border:1px solid}
.flash.ok{background:#0e2019;border-color:#1c4234;color:#9fe9cf}
.flash.err{background:#1c1014;border-color:#4a2029;color:#ff9aa6}
.flash.info{background:#0e1a2a;border-color:#1d3350;color:#9cc4ff}
.two{display:grid;grid-template-columns:1fr;gap:14px}
@media(min-width:820px){.two{grid-template-columns:1.15fr .85fr}}
.list{display:flex;flex-direction:column;gap:10px}
.item{display:flex;align-items:center;gap:10px;justify-content:space-between;padding:11px 13px;border:1px solid #182333;border-radius:11px;background:#0c141e;font-size:13.5px}
.item .l{min-width:0}
.item .t{font-weight:600}
.item .m{color:#7f92a8;font-size:12px}
.warnbox{border:1px solid #4a3620;background:#1a140c;color:#ffd08a;padding:11px 13px;border-radius:11px;font-size:13px}
.keybox{border:1px dashed #2a4761;background:#0a1420;border-radius:12px;padding:13px;margin:12px 0}
.qr{background:#fff;padding:10px;border-radius:12px;width:240px;height:240px;display:grid;place-items:center}
footer.site{border-top:1px solid #131d29;margin-top:34px;padding:24px 0 44px;color:#6f8199;font-size:12.5px}
footer.site a{color:#9fb0c6}
.row{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.spacer{flex:1}
.small{font-size:12.5px;color:#8fa1b6}
.hr{height:1px;background:#152130;margin:18px 0;border:0}
.nowrap{white-space:nowrap}
@media(max-width:640px){pre.code{white-space:pre-wrap;word-break:break-word}.qr{width:220px;height:220px}}
`;

// Light "paper shop" theme — cream paper + ink + one blue accent. No gradients.
const CSS_LIGHT = `
:root{color-scheme:light;--bg:#FBF7EF;--surface:#FFFFFF;--ink:#1B2330;--muted:#5C6775;--line:#E5DCCB;--line2:#EFE9DE;--accent:#2563EB;--accent2:#1D4ED8;--soft:#EEF4FF}
html{color-scheme:light}
body{background:var(--bg);color:var(--ink);font-family:"IBM Plex Sans Thai","Noto Sans Thai","Sarabun",system-ui,-apple-system,sans-serif;font-size:15.5px;line-height:1.66}
header.site{background:var(--bg);-webkit-backdrop-filter:none;backdrop-filter:none;border-bottom:1px solid var(--line)}
.nav{height:64px}
.brand{color:var(--ink);letter-spacing:0}
.logo{background:var(--accent);color:#fff;border-radius:9px}
.nav-links{color:var(--muted)}
.nav-links a:hover{color:var(--ink)}
.balance-pill{background:#fff;border:1px solid var(--line);color:var(--accent2);font-weight:600}
.btn{background:#fff;border:1px solid #D9E0EA;color:var(--ink);border-radius:10px;min-height:44px;box-shadow:0 1px 2px rgba(27,35,48,.05);transform:none}
.btn:hover{border-color:#BAC7D9;background:#FFFDF9;transform:none}
.btn.primary{background:var(--accent);border-color:var(--accent);color:#fff;box-shadow:none}
.btn.primary:hover{background:var(--accent2);filter:none}
.btn.ghost{background:transparent;border-color:transparent;color:var(--accent);box-shadow:none}
.btn.danger{border-color:#E7C5C0;background:#FDF4F2;color:#B42318}
.btn.sm{min-height:38px;padding:6px 12px}
h1,h2,h3{color:var(--ink);letter-spacing:0}
h1{line-height:1.34}
@media(max-width:600px){.nav .btn.ghost{display:none}.nav .balance-pill{display:none}.brand{font-size:15px}.nav{gap:10px}}
.hero{padding:52px 0 16px}
.pill{background:#fff;border:1px solid var(--line);color:var(--muted);border-radius:999px;font-size:13px;margin-bottom:18px}
.dot{background:var(--accent);box-shadow:none}
.grad{background:none;color:var(--accent);-webkit-text-fill-color:var(--accent)}
.lead{color:#4B5563}
.chips{color:var(--muted)}
.chip{background:#fff;border:1px solid var(--line)}
section{padding:30px 0}
.sub{color:var(--muted)}
.card{background:#fff;background-image:none;border:1px solid var(--line);border-radius:14px;box-shadow:0 1px 2px rgba(27,35,48,.04)}
.card .btn{width:auto;margin-top:0}
.plan .btn{width:100%;margin-top:auto}
.plan .name{color:var(--muted);font-weight:600;font-size:12.5px;letter-spacing:.06em;text-transform:uppercase}
.plan .price{color:var(--ink);letter-spacing:0}
.plan .price small{color:var(--muted);font-weight:500}
.plan .credit{color:var(--accent2)}
.plan .note{color:var(--muted)}
.badge{background:var(--soft);border:1px solid #D6E4FF;color:var(--accent2);font-weight:600}
.kpi{background:#fff;border:1px solid var(--line);box-shadow:0 1px 2px rgba(27,35,48,.04)}
.kpi .k{color:var(--muted)}
.kpi .v{color:var(--ink);letter-spacing:0}
.kpi .u{color:var(--muted)}
.codebox{background:#FFFDF8;border:1px solid var(--line)}
pre.code{color:#26313F}
.tbl-wrap{background:#fff;border:1px solid var(--line)}
.tbl th{background:#F7F3EA;color:#6B7280;border-bottom:1px solid var(--line)}
.tbl td{color:#26313F;border-bottom:1px solid var(--line2)}
.tbl tfoot td{background:#F9F6EF;color:var(--ink);border-top:1px solid var(--line)}
.status{border-radius:6px;font-weight:600}
.s-ok{color:#0F7A55;background:#EDF7F1;border-color:#CDE8DA}
.s-err{color:#B42318;background:#FDF2F1;border-color:#EFCDC8}
.s-warn{color:#946200;background:#FEF6E7;border-color:#F0DFB7}
.input,textarea,select{background:#fff;border:1px solid #D9E0EA;color:var(--ink)}
.input:focus,textarea:focus,select:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(37,99,235,.12);outline:none}
label.lbl{color:var(--muted)}
.flash.ok{background:#EDF7F1;border-color:#CDE8DA;color:#0B5C41}
.flash.err{background:#FDF2F1;border-color:#EFCDC8;color:#8F1D14}
.flash.info{background:var(--soft);border-color:#D6E4FF;color:#1E40AF}
.item{background:#fff;border:1px solid var(--line)}
.item .m{color:var(--muted)}
.warnbox{background:#FEF6E7;border:1px solid #F0DFB7;color:#7A5200}
.keybox{background:#F7FAFF;border:1px dashed #B8CDF1}
.codebox{display:flex;flex-direction:column;padding:0}
.codebox .copy{position:static;align-self:flex-end;margin:8px 8px 0 auto}
pre.code{padding:10px 14px 14px}
.qr{box-shadow:0 1px 3px rgba(27,35,48,.08)}
footer.site{border-top:1px solid var(--line);color:var(--muted)}
footer.site a{color:var(--accent2)}
.small{color:var(--muted)}
.hr{background:var(--line)}
a:hover{color:var(--accent2)}
:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
@media(max-width:700px){
  .nav{height:auto;padding:10px 0;flex-wrap:wrap;row-gap:6px}
  .right{gap:6px}
  .btn.sm{padding:5px 9px;font-size:12px;min-height:36px}
  .hide-sm{display:none!important}
  .tbl{white-space:normal}
  .tbl td,.tbl th{word-break:break-word;overflow-wrap:anywhere}
  .tbl th,.tbl td{padding:7px 8px;font-size:12.5px;vertical-align:top}
  .tbl th{font-size:10.5px;letter-spacing:0}
  .tbl .num{white-space:nowrap}
  .tbl td.mono{word-break:normal;overflow-wrap:anywhere}
  .btn,.btn.sm{min-height:44px}
  .wrap{padding:0 14px}
  .card{padding:14px}
  .kpi{padding:10px 12px}
  .kpi .v{font-size:17px}
  .kpi .u{font-size:11.5px}
  .cta{flex-direction:column;align-items:stretch}
  .cta .btn{width:100%}
  .btn.big{width:100%}
  section{padding:22px 0}
  .hero{padding:32px 0 6px}
  h1{font-size:clamp(24px,7.2vw,34px)}
  .lead{font-size:15px}
  .codebox pre.code{white-space:pre-wrap;word-break:break-word;font-size:11.5px}
  .qr{width:200px;height:200px}
  .plans{gap:10px}
  .tbl-wrap{-webkit-overflow-scrolling:touch}
}
`;

export function esc(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

export function thb(n, digits = 2) {
  const v = Number(n || 0);
  return v.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

export function tok(n) {
  return Number(n || 0).toLocaleString('en-US');
}

export function money(n) {
  const v = Number(n || 0);
  if (v > 0 && v < 0.01) return '< ฿0.01';
  return '฿' + thb(v, v >= 1 ? 2 : 4);
}

export function displayModel(id) {
  const s = String(id || '');
  if (s === 'deepseek-v4.1-flash' || s === 'deepseek-v4.1-flash-eco' || s === 'deepseek-eco') return 'DeepSeek V4.1 Flash';
  return s;
}

function monoPath(path) {
  return esc(path).replace(/\//g, '/<wbr>');
}

export function dt(value) {
  if (!value) return '-';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '-';
  const iso = new Date(d.getTime() + 7 * 3600000).toISOString();
  return `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)} ${iso.slice(11, 16)}`;
}

export function dOnly(value) {
  return dt(value).slice(0, 10);
}

function statusChip(status) {
  if (status === 'paid') return '<span class="status s-ok">ชำระแล้ว</span>';
  if (status === 'review') return '<span class="status s-warn">รอตรวจ</span>';
  if (status === 'cancelled') return '<span class="status s-err">ยกเลิก</span>';
  return '<span class="status s-warn">รอชำระ</span>';
}

function httpChip(code) {
  if (!code) return '<span class="status s-err">ผิดพลาด</span>';
  if (code >= 200 && code < 300) return '<span class="status s-ok">สำเร็จ</span>';
  if (code === 402) return '<span class="status s-warn">เครดิตไม่พอ</span>';
  if (code === 429) return '<span class="status s-warn">เรียกถี่เกิน</span>';
  if (code === 401) return '<span class="status s-err">คีย์ไม่ถูกต้อง</span>';
  return `<span class="status s-err">ผิดพลาด ${code}</span>`;
}

export function layout({ title = 'JapexisKey', user = null, active = '', content = '', noindex = false }) {
  const navUser = user
    ? `<span class="balance-pill">เครดิต ฿${thb(user.balance_thb)}</span><a class="btn sm" href="/app">แดชบอร์ด</a>${user.role === 'admin' ? '<a class="btn sm" href="/admin">แอดมิน</a>' : ''}`
    : `<a class="btn primary sm" href="/login">เข้าสู่ระบบ</a>`;
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="JapexisKey — คีย์ AI ราคาบาท เริ่ม 10 บาท จ่ายตามใช้จริง ดูประวัติการใช้ได้ทุกครั้ง">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='9' fill='%2337e0b0'/%3E%3Ctext x='16' y='23' font-size='18' font-family='sans-serif' font-weight='bold' text-anchor='middle' fill='%2304121a'%3EJ%3C/text%3E%3C/svg%3E">
<style>${CSS}${CSS_LIGHT}</style>
</head>
<body>
<header class="site"><div class="wrap nav">
  <a class="brand" href="/"><span class="logo">J</span>Japexis<span style="color:#2563EB">Key</span></a>
  <div class="nav-links">
    <a href="/"${active === 'home' ? ' style="color:#1B2330;font-weight:600"' : ''}>หน้าแรก</a>
    <a href="/buy"${active === 'buy' ? ' style="color:#1B2330;font-weight:600"' : ''}>ราคา</a>
    <a href="/docs"${active === 'docs' ? ' style="color:#1B2330;font-weight:600"' : ''}>เอกสาร API</a>
    ${user && user.role === 'admin' ? `<a href="/stats"${active === 'stats' ? ' style="color:#1B2330;font-weight:600"' : ''}>สถานะระบบ</a>` : ''}
  </div>
  <div class="right">${navUser}</div>
</div></header>
<main class="wrap">${content}</main>
<footer class="site"><div class="wrap" style="padding:0">
  <div class="row">
    <div>© ${new Date().getFullYear()} JapexisKey · คีย์ AI ราคาบาท</div>
    <div class="spacer"></div>
    <div><a href="/docs">API</a> · <a href="/buy">ราคา</a> · ${user ? '<a href="/logout">ออกจากระบบ</a>' : '<a href="/login">เข้าสู่ระบบ</a>'}</div>
  </div>
</div></footer>
<script>
document.addEventListener('click', function (e) {
  var b = e.target.closest('[data-copy]');
  if (!b) return;
  var t = b.getAttribute('data-copy');
  var done = function () {
    var old = b.textContent; b.textContent = 'คัดลอกแล้ว';
    setTimeout(function () { b.textContent = old; }, 1300);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(t).then(done).catch(function () { window.prompt('คัดลอกข้อความนี้:', t); });
  } else {
    window.prompt('คัดลอกข้อความนี้:', t);
  }
});
</script>
</body>
</html>`;
}

export function landing({ plans, prices, baseUrl, google = false, model = 'deepseek-v4.1-flash', user = null }) {
  const planCopy = {
    A: { name: 'A · เริ่มต้น', badge: 'เริ่มต้น', note: 'สำหรับงานเล็กหรือลองใช้' },
    B: { name: 'B · คุ้มค่า', badge: 'ได้เครดิตเพิ่ม 10%', note: 'สำหรับใช้งานประจำ' },
    C: { name: 'C · ประหยัดสุด', badge: 'ได้เครดิตเพิ่ม 20%', note: 'เครดิตต่อบาทสูงสุด' },
  };
  const planCards = plans.map((p) => {
    const pc = planCopy[p.code] || { name: p.name, badge: p.badge, note: p.note };
    return `
      <div class="card plan">
        ${pc.badge ? `<span class="badge">${esc(pc.badge)}</span>` : ''}
        <div class="name">${esc(pc.name)}</div>
        <div class="price">฿${thb(p.price_thb, 0)}<small>ครั้งเดียว</small></div>
        <div class="credit">ได้เครดิต ฿${thb(p.credit_thb, 0)} ${Number(p.credit_thb) > Number(p.price_thb) ? `<span style="color:#7f92a8">(+${Math.round((Number(p.credit_thb) / Number(p.price_thb) - 1) * 100)}%)</span>` : ''}</div>
        <div class="note">${esc(pc.note || '')}</div>
        <a class="btn ${p.code === 'B' ? 'primary' : ''}" href="/buy/${esc(p.code)}">ซื้อแผน ${esc(p.code)}</a>
      </div>`;
  }).join('');

  const content = `
  <section class="hero">
    <span class="pill"><span class="dot"></span> เครดิตทดลอง ฿10</span>
    <h1>คีย์ AI ราคาบาท<br><span class="grad">จ่ายตามใช้จริง เห็นค่าใช้จ่ายทุกครั้ง</span></h1>
    <p class="lead">คีย์เดียวสำหรับแอป AI ที่รองรับ API · โมเดล <b class="mono">${esc(model)}</b> เริ่ม ฿10 ไม่มีรายเดือน ไม่มีค่าสมัคร</p>
    <div class="cta">
      <a class="btn primary big" href="${google ? '/auth/google' : '/login'}">${google ? 'สมัครด้วย Google' : 'เข้าสู่ระบบ'}</a>
      <a class="btn ghost big" href="/docs">ดูวิธีใช้ API</a>
    </div>
    <div class="chips">
      <span class="chip">ไม่มีรายเดือน</span>
      <span class="chip">เครดิตทดลอง ฿10</span>
      <span class="chip">ขาเข้า / ขาออก / จากแคช</span>
      <span class="chip">จ่ายผ่าน PromptPay</span>
      <span class="chip">ไม่เก็บข้อความที่คุณส่ง</span>
    </div>
  </section>

  <section>
    <h2>เติมเครดิต</h2>
    <p class="sub">จ่ายครั้งเดียว รับเครดิตเข้าระบบทันที — แพ็กเกจใหญ่ขึ้น ได้เครดิตต่อบาทมากขึ้น</p>
    <div class="plans">${planCards}</div>
  </section>

  <section>
    <div class="two">
      <div class="card">
        <h2 style="font-size:18px">ราคาต่อ 1 ล้านโทเคน</h2>
        <div class="tbl-wrap" style="margin-top:12px">
          <table class="tbl">
            <thead><tr><th>รายการ</th><th class="num">ราคา</th></tr></thead>
            <tbody>
              <tr><td>ข้อความที่ส่ง (ขาเข้า)</td><td class="num">฿${thb(prices.in, 2)}</td></tr>
              <tr><td>คำตอบ (ขาออก)</td><td class="num">฿${thb(prices.out, 2)}</td></tr>
              <tr><td>ข้อมูลจากแคช</td><td class="num">฿${thb(prices.cacheRead, 2)}</td></tr>
            </tbody>
          </table>
        </div>
        <p class="small" style="margin:10px 0 0">คิดตามปริมาณที่ใช้จริงในแต่ละครั้ง — ไม่มีขั้นต่ำ</p>
      </div>
      <div class="card">
        <h2 style="font-size:18px">ใช้ยังไง</h2>
        <div class="list" style="margin-top:12px">
          <div class="item"><div class="l"><div class="t">1. สมัคร + รับคีย์</div><div class="m">ได้คีย์ JXK-… ใช้ได้ทันที</div></div></div>
          <div class="item"><div class="l"><div class="t">2. เติมเครดิต</div><div class="m">เลือกแผน A / B / C สแกน PromptPay</div></div></div>
          <div class="item"><div class="l"><div class="t">3. ต่อแอปที่ใช้อยู่</div><div class="m">ใส่ที่อยู่ API <span class="mono">${esc(baseUrl)}/v1</span> และคีย์ของคุณ</div></div></div>
        </div>
        <div class="codebox"><button class="btn sm copy" data-copy="curl ${esc(baseUrl)}/v1/chat/completions -H &quot;Authorization: Bearer JXK-YOUR-KEY&quot; -H &quot;Content-Type: application/json&quot; -d '{&quot;model&quot;:&quot;${esc(model)}&quot;,&quot;messages&quot;:[{&quot;role&quot;:&quot;user&quot;,&quot;content&quot;:&quot;สวัสดี&quot;}]}'">คัดลอก</button><pre class="code">curl ${esc(baseUrl)}/v1/chat/completions \\
  -H "Authorization: Bearer JXK-YOUR-KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"${esc(model)}","messages":[{"role":"user","content":"สวัสดี"}]}'</pre></div>
        <p class="small" style="margin:0">คีย์จริงแสดงเต็มครั้งเดียวตอนสร้าง — ถ้าไม่ได้เก็บไว้ ให้สร้างคีย์ใหม่ในแดชบอร์ด</p>
      </div>
    </div>
  </section>

  <section>
    <h2>คำถามที่เจอบ่อย</h2>
    <div class="two" style="margin-top:12px">
      <div class="card list" style="gap:14px">
        <div><div class="t" style="font-weight:700">ใช้กับแอปอะไรได้บ้าง?</div><div class="small">แอปหรือ SDK ที่รองรับ API แบบ OpenAI เช่น Cursor, Cline, OpenCode, n8n — ใส่ที่อยู่ API และคีย์ของเรา</div></div>
        <div><div class="t" style="font-weight:700">เครดิตหมดอายุไหม?</div><div class="small">ไม่หมดอายุ ใช้จนกว่าจะหมด แล้วค่อยเติมรอบใหม่</div></div>
        <div><div class="t" style="font-weight:700">จ่ายเงินยังไง?</div><div class="small">ครั้งแรกได้เครดิตทดลอง ฿10 ใช้ได้ทันที · เติมเพิ่ม: สแกน PromptPay แล้วแนบสลิป ทีมงานตรวจสอบและเติมเครดิตให้</div></div>
      </div>
      <div class="card list" style="gap:14px">
        <div><div class="t" style="font-weight:700">ดูประวัติการใช้ละเอียดแค่ไหน?</div><div class="small">ทุกครั้งที่ใช้งาน: เวลา, สถานะ, โทเคนเข้า/ออก, จากแคช, ค่าบริการเป็นบาท — ดาวน์โหลดเป็น CSV ได้</div></div>
        <div><div class="t" style="font-weight:700">เก็บข้อมูลอะไรบ้าง?</div><div class="small">เราเก็บเฉพาะจำนวนโทเคนและสถานะการใช้งาน — ไม่เก็บข้อความที่คุณส่งหรือคำตอบของโมเดล</div></div>
        <div><div class="t" style="font-weight:700">มีโมเดลอะไรให้ใช้?</div><div class="small">ตอนนี้มีโมเดลเดียว: <b>DeepSeek V4.1 Flash</b> (<span class="mono">${esc(model)}</span>) — เหมาะกับงานแชทและสรุปความ</div></div>
      </div>
    </div>
  </section>`;
  return layout({ title: 'JapexisKey — คีย์ AI ราคาบาท เริ่ม ฿10', content, active: 'home', user });
}

export function authPage({ mode, error = '', google = false, notice = '' }) {
  const isSignup = mode === 'signup';
  const content = `
  <section style="padding-top:42px">
    <h1 style="font-size:30px">${isSignup ? 'สมัครใช้งาน' : 'เข้าสู่ระบบ'}</h1>
    <p class="sub">ใช้บัญชี Google — ครั้งแรกได้เครดิตทดลอง ฿10 ใช้ได้เลย</p>
    ${error ? `<div class="flash err">${esc(error)}</div>` : ''}
    ${notice ? `<div class="flash info">${esc(notice)}</div>` : ''}
    ${google
      ? `<a class="btn primary" href="/auth/google" style="width:100%;max-width:430px">${isSignup ? 'สมัครด้วย Google' : 'เข้าสู่ระบบด้วย Google'}</a>
         <p class="small" style="margin-top:16px">ล็อกอินด้วยบัญชี Google ของคุณ · ถ้ายังไม่มีบัญชี ระบบสร้างให้อัตโนมัติพร้อมเครดิตทดลอง</p>`
      : `<div class="warnbox" style="max-width:430px">ระบบล็อกอินยังไม่เปิดใช้งาน — แจ้งแอดมิน</div>`}
  </section>`;
  return layout({ title: `เข้าสู่ระบบ — JapexisKey`, content, noindex: true });
}

export function dashPage({ user, keys, newKey, stats, recent, orders, baseUrl, model, flash }) {
  const keyRows = keys.map((k) => `
      <tr>
        <td>${esc(k.name === 'default' ? 'คีย์หลัก' : k.name)}</td>
        <td class="mono">${esc(k.prefix)}…</td>
        <td class="hide-sm">${dt(k.created_at)}</td>
        <td class="hide-sm">${k.last_used_at ? dt(k.last_used_at) : '-'}</td>
        <td>${k.revoked ? '<span class="status s-err">ปิดใช้</span>' : '<span class="status s-ok">ใช้งาน</span>'}</td>
        <td style="text-align:right">${k.revoked ? '' : `<form method="post" action="/app/keys/${k.id}/revoke" onsubmit="return confirm('ปิดใช้คีย์นี้? แอปที่ใช้คีย์นี้จะใช้ไม่ได้ทันที')"><button class="btn sm danger" type="submit">ปิดใช้</button></form>`}</td>
      </tr>`).join('');

  const usageRows = recent.map((r) => `
      <tr>
        <td>${dt(r.created_at)}</td>
        <td>${httpChip(r.status)}</td>
        <td class="num">${tok(r.prompt_tokens)}</td>
        <td class="num">${tok(r.completion_tokens)}</td>
        <td class="num hide-sm">${tok(r.cache_read_tokens)}</td>
        <td class="num">${money(r.cost_thb)}</td>
      </tr>`).join('') || `<tr><td colspan="5" class="small">ยังไม่มีการใช้งาน — เริ่มจากโค้ดตัวอย่างด้านขวา</td></tr>`;

  const orderRows = orders.map((o) => `
      <div class="item">
        <div class="l"><div class="t">${esc(o.ref)} · แผน ${esc(o.plan_code)}</div><div class="m">฿${thb(o.amount_thb, 0)} → เครดิต ฿${thb(o.credit_thb, 0)} · ${dt(o.created_at)}</div></div>
        <div>${statusChip(o.status)} ${o.status !== 'paid' && o.status !== 'cancelled' ? `<a class="btn sm" href="/order/${esc(o.ref)}">ดู/จ่าย</a>` : ''}</div>
      </div>`).join('');

  const content = `
  <section style="padding-top:36px">
    <div class="row">
      <div><h1 style="font-size:26px;margin:0">สวัสดี${user.name ? ', ' + esc(user.name) : ''}</h1><p class="sub" style="margin:4px 0 0">ที่อยู่ API ของคุณ: <span class="mono">${esc(baseUrl)}/v1</span></p></div>
      <div class="spacer"></div>
      <a class="btn primary" href="/buy">+ เติมเครดิต</a>
    </div>
    ${flash ? `<div class="flash ok">${esc(flash)}</div>` : ''}
    ${newKey ? `<div class="keybox">
      <div style="font-weight:700;color:#9fe9cf">คีย์ใหม่ของคุณ (แสดงครั้งเดียว — คัดลอกเก็บไว้)</div>
      <div class="row" style="margin-top:8px"><span class="mono" style="font-size:13px;word-break:break-all">${esc(newKey)}</span></div>
      <div style="margin-top:10px"><button class="btn sm" data-copy="${esc(newKey)}">คัดลอกคีย์</button></div>
    </div>` : ''}

    <div class="kpis" style="margin-top:16px">
      <div class="kpi"><div class="k">เครดิตคงเหลือ</div><div class="v">฿${thb(user.balance_thb, 2)}</div><div class="u">ใช้ได้จนกว่าจะหมด</div></div>
      <div class="kpi"><div class="k">คำขอ 30 วัน</div><div class="v">${tok(stats.requests)}</div><div class="u">นับทุกครั้ง</div></div>
      <div class="kpi"><div class="k">โทเคน 30 วัน</div><div class="v">${tok(Number(stats.pt) + Number(stats.ct))}</div><div class="u">เข้า ${tok(stats.pt)} · ออก ${tok(stats.ct)}</div></div>
      <div class="kpi"><div class="k">ใช้จ่าย 30 วัน</div><div class="v">${money(stats.cost)}</div><div class="u">อ่านจากแคช ${tok(stats.cat)}</div></div>
    </div>

    <div class="two" style="margin-top:18px">
      <div class="card">
        <div class="row"><h2 style="font-size:17px;margin:0">คีย์ API</h2><div class="spacer"></div>
          <form method="post" action="/app/keys"><button class="btn sm" type="submit">สร้างคีย์ใหม่</button></form>
        </div>
        <div class="tbl-wrap" style="margin-top:12px">
          <table class="tbl">
            <thead><tr><th>ชื่อ</th><th>คีย์</th><th class="hide-sm">สร้าง</th><th class="hide-sm">ใช้ล่าสุด</th><th>สถานะ</th><th></th></tr></thead>
            <tbody>${keyRows || '<tr><td colspan="6" class="small">ยังไม่มีคีย์</td></tr>'}</tbody>
          </table>
        </div>
      </div>
      <div class="card">
        <h2 style="font-size:17px;margin:0">เริ่มใช้งาน</h2>
        <p class="small" style="margin:6px 0 0">ที่อยู่ API: <span class="mono">${esc(baseUrl)}/v1</span> · โมเดล: <span class="mono">${esc(model)}</span></p>
        <div class="codebox"><button class="btn sm copy" data-copy="curl ${esc(baseUrl)}/v1/chat/completions -H &quot;Authorization: Bearer YOUR-KEY&quot; -H &quot;Content-Type: application/json&quot; -d '{&quot;model&quot;:&quot;${esc(model)}&quot;,&quot;messages&quot;:[{&quot;role&quot;:&quot;user&quot;,&quot;content&quot;:&quot;สวัสดี&quot;}]}'">คัดลอก</button><pre class="code">curl ${esc(baseUrl)}/v1/chat/completions \\
  -H "Authorization: Bearer YOUR-KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"${esc(model)}","messages":[{"role":"user","content":"สวัสดี"}]}'</pre></div>
        <div class="small">ใช้กับแอปที่รองรับ OpenAI API: ใส่ที่อยู่ API นี้กับคีย์ของคุณ · คีย์แสดงเต็มครั้งเดียวตอนสร้าง</div>
      </div>
    </div>

    <div class="card" style="margin-top:18px">
      <div class="row"><h2 style="font-size:17px;margin:0">ใช้งานผ่าน API</h2><div class="spacer"></div><a class="btn sm" href="/docs">ดูตัวอย่างโค้ด</a></div>
      <p class="small" style="margin:6px 0 10px">ที่อยู่ API: <span class="mono">${esc(baseUrl)}/v1</span> · ทุกคำขอใช้ <span class="mono">Authorization: Bearer คีย์ของคุณ</span></p>
      <div class="tbl-wrap">
        <table class="tbl">
          <thead><tr><th>Method</th><th>Path</th><th>ใช้ทำอะไร</th></tr></thead>
          <tbody>
            <tr><td class="mono">POST</td><td class="mono">${monoPath('/v1/chat/completions')}</td><td>ส่งคำถาม/รับคำตอบ (รองรับสตรีม)</td></tr>
            <tr><td class="mono">GET</td><td class="mono">${monoPath('/v1/models')}</td><td>ดูรายชื่อโมเดลที่ใช้ได้</td></tr>
            <tr><td class="mono">GET</td><td class="mono">${monoPath('/v1/me')}</td><td>เครดิตคงเหลือ + สรุปการใช้งาน</td></tr>
            <tr><td class="mono">GET</td><td class="mono">${monoPath('/v1/usage')}</td><td>ประวัติการใช้งานล่าสุด</td></tr>
          </tbody>
        </table>
      </div>
      <div class="row" style="margin-top:10px">
        <button class="btn sm" data-copy="${esc(baseUrl)}/v1">คัดลอกที่อยู่ API</button>
        <a class="btn sm" href="/app/usage">ดูการใช้งานของฉัน</a>
      </div>
    </div>

    <div class="card" style="margin-top:18px">
      <div class="row"><h2 style="font-size:17px;margin:0">ใช้งานล่าสุด</h2><div class="spacer"></div><a class="btn sm" href="/app/usage">ดูทั้งหมด</a></div>
      <div class="tbl-wrap" style="margin-top:12px">
        <table class="tbl">
          <thead><tr><th>เวลา</th><th>สถานะ</th><th class="num">เข้า</th><th class="num">ออก</th><th class="num">จากแคช</th><th class="num">ค่าใช้จ่าย</th></tr></thead>
          <tbody>${usageRows}</tbody>
        </table>
      </div>
    </div>

    ${orderRows ? `<div class="card" style="margin-top:18px"><h2 style="font-size:17px;margin:0 0 12px">คำสั่งซื้อของฉัน</h2><div class="list">${orderRows}</div></div>` : ''}
  </section>`;
  return layout({ title: 'แดชบอร์ด — JapexisKey', user, content, noindex: true });
}

export function buyPage({ plans, prices, user, flash, model = 'deepseek-v4.1-flash' }) {
  const planCopy = {
    A: { name: 'A · เริ่มต้น', badge: 'เริ่มต้น', note: 'สำหรับงานเล็กหรือลองใช้' },
    B: { name: 'B · คุ้มค่า', badge: 'ได้เครดิตเพิ่ม 10%', note: 'สำหรับใช้งานประจำ' },
    C: { name: 'C · ประหยัดสุด', badge: 'ได้เครดิตเพิ่ม 20%', note: 'เครดิตต่อบาทสูงสุด' },
  };
  const cards = plans.map((p) => {
    const pc = planCopy[p.code] || { name: p.name, badge: p.badge, note: p.note };
    return `
      <div class="card plan">
        ${pc.badge ? `<span class="badge">${esc(pc.badge)}</span>` : ''}
        <div class="name">${esc(pc.name)}</div>
        <div class="price">฿${thb(p.price_thb, 0)}<small>จ่ายครั้งเดียว</small></div>
        <div class="credit">ได้เครดิต ฿${thb(p.credit_thb, 2)}</div>
        <div class="note">${esc(pc.note || '')}</div>
        <form method="post" action="/buy/${esc(p.code)}"><button class="btn ${p.code === 'B' ? 'primary' : ''}" type="submit">ซื้อแผนนี้</button></form>
      </div>`;
  }).join('');
  const content = `
  <section style="padding-top:36px">
    <h1 style="font-size:28px;margin:0">เติมเครดิต</h1>
    <p class="sub" style="margin:6px 0 18px">สแกนจ่ายผ่าน PromptPay · เครดิตเข้าบัญชีหลังตรวจสอบการชำระเงิน · ไม่มีวันหมดอายุ</p>
    ${flash ? `<div class="flash info">${esc(flash)}</div>` : ''}
    <div class="plans">${cards}</div>
    <div class="warnbox" style="margin-top:16px">โมเดล: <b>DeepSeek V4.1 Flash</b> (<span class="mono">${esc(model)}</span>) · ราคาต่อ 1 ล้านโทเคน: ข้อความที่ส่ง ฿${thb(prices.in, 2)} · คำตอบ ฿${thb(prices.out, 2)} · จากแคช ฿${thb(prices.cacheRead, 2)} — หักจากเครดิตตามใช้จริง</div>
    <p class="small" style="margin-top:14px">เครดิตปัจจุบัน: <b>฿${thb(user.balance_thb, 2)}</b></p>
  </section>`;
  return layout({ title: 'เติมเครดิต — JapexisKey', user, content, noindex: true });
}

export function orderPage({ order, user, qr, settings, flash }) {
  const paid = order.status === 'paid';
  const content = `
  <section style="padding-top:36px">
    <a class="small" href="/app">← กลับแดชบอร์ด</a>
    <h1 style="font-size:26px;margin:10px 0 4px">คำสั่งซื้อ ${esc(order.ref)}</h1>
    <div class="row"><div class="small">แผน ${esc(order.plan_code)} · สร้าง ${dt(order.created_at)}</div><div class="spacer"></div><div>${statusChip(order.status)}</div></div>
    ${flash ? `<div class="flash ${paid ? 'ok' : 'info'}">${esc(flash)}</div>` : ''}
    <div class="two" style="margin-top:16px">
      <div class="card">
        <div class="row">
          <div><div class="small">ยอดที่ต้องโอน</div><div style="font-size:34px;font-weight:800;letter-spacing:-1px">฿${thb(order.amount_thb, 2)}</div></div>
          <div class="spacer"></div>
          <div style="text-align:right"><div class="small">เครดิตที่จะได้</div><div style="font-size:20px;font-weight:700;color:#9fe9cf">฿${thb(order.credit_thb, 2)}</div></div>
        </div>
        <hr class="hr">
        <div class="small">โอนผ่านพร้อมเพย์ไปที่</div>
        <div class="mono" style="font-size:15px;margin:2px 0 0">${esc(settings.promptpay_id || '— ยังไม่ตั้งค่า —')}</div>
        <div class="small">${esc(settings.promptpay_name || '')}</div>
        <div class="row" style="margin-top:12px">
          <button class="btn sm" data-copy="${esc(settings.promptpay_id || '')}">คัดลอกเลขพร้อมเพย์</button>
          <button class="btn sm" data-copy="${esc(order.ref)}">คัดลอกเลขออเดอร์</button>
        </div>
        ${order.status === 'pending' ? `<form method="post" action="/order/${esc(order.ref)}/notify" style="margin-top:16px">
          <label class="lbl" for="note">แนบเลขอ้างอิงสลิป / เวลาโอน (ถ้ามี)</label>
          <input class="input" id="note" name="note" maxlength="200" placeholder="เช่น 12/11 11:24 · ref 0123456789">
          <button class="btn primary" type="submit" style="margin-top:10px">แจ้งว่าโอนแล้ว</button>
        </form>` : ''}
        ${order.status === 'review' ? `<div class="flash info" style="margin-top:14px">ได้รับแจ้งโอนแล้ว — รอตรวจสอบการชำระเงิน ${order.payer_note ? `<br><span class="small">${esc(order.payer_note)}</span>` : ''}</div>` : ''}
        ${paid ? `<div class="flash ok" style="margin-top:14px">ชำระแล้ว เครดิตเข้าบัญชี ฿${thb(order.credit_thb, 2)}</div>` : ''}
      </div>
      <div class="card" style="display:flex;flex-direction:column;align-items:center;gap:10px">
        <div class="small">สแกนด้วยแอปธนาคาร (PromptPay)</div>
        ${qr ? `<div class="qr">${qr}</div>` : `<div class="warnbox">ยังไม่ได้ตั้งเลขพร้อมเพย์ — ติดต่อทีมงานพร้อมแจ้งเลขออเดอร์ ${esc(order.ref)}</div>`}
        <div class="small" style="text-align:center">QR ระบุยอด ฿${thb(order.amount_thb, 2)} · เลขออเดอร์ ${esc(order.ref)}</div>
      </div>
    </div>
  </section>`;
  return layout({ title: `คำสั่งซื้อ ${order.ref} — JapexisKey`, user, content, noindex: true });
}

export function usagePage({ user, stats, rows, range, periods = null }) {
  const ranges = [['7', '7 วัน'], ['30', '30 วัน'], ['all', 'ทั้งหมด']];
  const tabs = ranges.map(([k, label]) => `<a class="btn sm ${range === k ? 'primary' : 'ghost'}" href="/app/usage?range=${k}">${label}</a>`).join(' ');
  const trs = rows.map((r) => `
      <tr>
        <td>${dt(r.created_at)}</td>
        <td class="hide-sm"><span class="mono">${esc(displayModel(r.model))}</span>${r.stream ? ' <span class="small">สตรีม</span>' : ''}${r.estimated ? ' <span class="small">ประมาณ</span>' : ''}</td>
        <td>${httpChip(r.status)}</td>
        <td class="num">${tok(r.prompt_tokens)}</td>
        <td class="num">${tok(r.completion_tokens)}</td>
        <td class="num hide-sm">${tok(r.cache_read_tokens)}</td>
        <td class="num">${money(r.cost_thb)}</td>
        <td class="num hide-sm">${r.latency_ms ? `${(r.latency_ms / 1000).toFixed(1)} วิ` : '-'}</td>
      </tr>`).join('') || `<tr><td colspan="8" class="small">ไม่มีข้อมูลในช่วงนี้</td></tr>`;

  const content = `
  <section style="padding-top:36px">
    <div class="row"><h1 style="font-size:26px;margin:0">ประวัติการใช้งาน</h1><div class="spacer"></div><a class="btn sm" href="/app/usage.csv?range=${range}">ดาวน์โหลด CSV</a></div>
    <p class="sub" style="margin:6px 0 14px">ทุกคำขอที่ใช้คีย์ของคุณ — นับโทเคนและค่าใช้จ่ายตามจริง (แถวที่ระบบประมาณจะติดป้าย “ประมาณ”)</p>
    ${periods ? `<div class="kpis" style="margin-bottom:12px;grid-template-columns:repeat(auto-fit,minmax(160px,1fr))">
      <div class="kpi"><div class="k">วันนี้</div><div class="v">${tok(periods.today.requests)} ครั้ง</div><div class="u">${money(periods.today.cost)} · ${tok(Number(periods.today.pt) + Number(periods.today.ct))} โทเคน</div></div>
      <div class="kpi"><div class="k">สัปดาห์นี้</div><div class="v">${tok(periods.week.requests)} ครั้ง</div><div class="u">${money(periods.week.cost)} · ${tok(Number(periods.week.pt) + Number(periods.week.ct))} โทเคน</div></div>
      <div class="kpi"><div class="k">เดือนนี้</div><div class="v">${tok(periods.month.requests)} ครั้ง</div><div class="u">${money(periods.month.cost)} · ${tok(Number(periods.month.pt) + Number(periods.month.ct))} โทเคน</div></div>
    </div>` : ''}
    <div class="kpis">
      <div class="kpi"><div class="k">จำนวนคำขอ</div><div class="v">${tok(stats.requests)}</div><div class="u">ผิดพลาด ${stats.errors} ครั้ง</div></div>
      <div class="kpi"><div class="k">โทเคนเข้า</div><div class="v">${tok(stats.pt)}</div><div class="u">โทเคน</div></div>
      <div class="kpi"><div class="k">โทเคนออก</div><div class="v">${tok(stats.ct)}</div><div class="u">โทเคน</div></div>
      <div class="kpi"><div class="k">อ่านจากแคช</div><div class="v">${tok(stats.cat)}</div><div class="u">โทเคน</div></div>
    </div>
    <div class="row" style="margin:16px 0 10px">${tabs}<div class="spacer"></div><div class="small">ค่าใช้จ่ายรวม ${money(stats.cost)}</div></div>
    <div class="tbl-wrap">
      <table class="tbl">
        <thead><tr><th>เวลา</th><th class="hide-sm">โมเดล</th><th>สถานะ</th><th class="num">เข้า</th><th class="num">ออก</th><th class="num hide-sm">จากแคช</th><th class="num">ค่าใช้จ่าย</th><th class="num hide-sm">เวลาตอบ</th></tr></thead>
        <tbody>${trs}</tbody>
      </table>
    </div>
    <p class="small" style="margin-top:10px">แสดง 300 รายการล่าสุด · ดูทั้งหมดได้ในไฟล์ CSV</p>
  </section>`;
  return layout({ title: 'ประวัติการใช้งาน — JapexisKey', user, content, noindex: true });
}

export function docsPage({ baseUrl, model, prices, user = null }) {
  const code = (text, label = 'คัดลอก') => `<div class="codebox"><button class="btn sm copy" data-copy="${esc(text)}">${label}</button><pre class="code">${esc(text)}</pre></div>`;
  const curl = `curl ${baseUrl}/v1/chat/completions \\
  -H "Authorization: Bearer YOUR-KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${model}",
    "messages": [{"role":"user","content":"อธิบาย PromptPay ให้ฟังหน่อย"}],
    "max_tokens": 512
  }'`;
  const py = `from openai import OpenAI

client = OpenAI(base_url="${baseUrl}/v1", api_key="YOUR-KEY")

r = client.chat.completions.create(
    model="${model}",
    messages=[{"role": "user", "content": "สวัสดี"}],
)
print(r.choices[0].message.content)
print(r.usage)  # prompt_tokens / completion_tokens`;
  const node = `import OpenAI from "openai";

const client = new OpenAI({ baseURL: "${baseUrl}/v1", apiKey: "YOUR-KEY" });

const r = await client.chat.completions.create({
  model: "${model}",
  messages: [{ role: "user", content: "สวัสดี" }],
});
console.log(r.choices[0].message.content, r.usage);`;
  const stream = `// เปิด stream ได้เหมือน OpenAI ปกติ
const stream = await client.chat.completions.create({
  model: "${model}",
  messages: [{ role: "user", content: "เขียนกลอนสั้น ๆ" }],
  stream: true,
});
for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content ?? "");
}`;

  const content = `
  <section style="padding-top:36px">
    <h1 style="font-size:30px;margin:0">เอกสาร API</h1>
    <p class="sub" style="margin:6px 0 0">ใช้ API มาตรฐานเดียวกับ OpenAI — ใส่ที่อยู่ API นี้ในแอปหรือ SDK ที่รองรับ</p>

    <div class="kpis" style="margin-top:18px">
      <div class="kpi"><div class="k">Base URL</div><div class="v mono" style="font-size:14px">${esc(baseUrl)}/v1</div><div class="u">HTTPS</div></div>
      <div class="kpi"><div class="k">Model</div><div class="v mono" style="font-size:13px">${esc(model)}</div><div class="u">โมเดลเดียวที่เปิดให้ใช้</div></div>
      <div class="kpi"><div class="k">Auth</div><div class="v mono" style="font-size:14px">Bearer JXK-…</div><div class="u">คีย์จากแดชบอร์ด</div></div>
      <div class="kpi"><div class="k">Rate limit</div><div class="v">30 / นาที</div><div class="u">ต่อคีย์</div></div>
    </div>

    <h2 style="margin-top:26px">Endpoints</h2>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Method</th><th>Path</th><th>คำอธิบาย</th></tr></thead>
      <tbody>
        <tr><td class="mono">POST</td><td class="mono">${monoPath('/v1/chat/completions')}</td><td>แชท (รองรับการสตรีมคำตอบ)</td></tr>
        <tr><td class="mono">GET</td><td class="mono">${monoPath('/v1/models')}</td><td>รายชื่อโมเดลที่ใช้งานได้</td></tr>
        <tr><td class="mono">GET</td><td class="mono">${monoPath('/v1/me')}</td><td>เครดิตคงเหลือ + สรุปการใช้งานของคีย์นี้</td></tr>
      </tbody>
    </table></div>

    <h2 style="margin-top:26px">ราคา</h2>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>ประเภทโทเคน</th><th class="num">ราคา / 1 ล้าน</th></tr></thead>
      <tbody>
        <tr><td>ข้อความที่ส่ง (ขาเข้า)</td><td class="num">฿${thb(prices.in, 2)}</td></tr>
        <tr><td>คำตอบ (ขาออก)</td><td class="num">฿${thb(prices.out, 2)}</td></tr>
        <tr><td>ข้อมูลจากแคช</td><td class="num">฿${thb(prices.cacheRead, 2)}</td></tr>
      </tbody>
    </table></div>

    <h2 style="margin-top:26px">ตัวอย่าง</h2>
    <h3 style="font-size:15px;color:#9fb0c6;margin:14px 0 0">curl</h3>
    ${code(curl)}
    <h3 style="font-size:15px;color:#9fb0c6;margin:14px 0 0">Python (OpenAI SDK)</h3>
    ${code(py)}
    <h3 style="font-size:15px;color:#9fb0c6;margin:14px 0 0">Node.js (openai)</h3>
    ${code(node)}
    <h3 style="font-size:15px;color:#9fb0c6;margin:14px 0 0">Stream</h3>
    ${code(stream)}

    <h2 style="margin-top:26px">รูปแบบผลลัพธ์</h2>
    <p class="small">ทุกคำตอบมีข้อมูลการใช้โทเคนแนบมาแบบเดียวกับ OpenAI — ตัวเลขชุดเดียวกันนี้แสดงในแดชบอร์ด</p>
    ${code(`{
  "id": "chatcmpl-...",
  "object": "chat.completion",
  "choices": [{ "index": 0, "message": { "role": "assistant", "content": "..." }, "finish_reason": "stop" }],
  "usage": {
    "prompt_tokens": 47,
    "completion_tokens": 17,
    "total_tokens": 64,
    "prompt_tokens_details": { "cached_tokens": 0 }
  }
}`)}

    <h2 style="margin-top:26px">Error codes</h2>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>HTTP</th><th>ความหมาย</th><th>ทำอะไรต่อ</th></tr></thead>
      <tbody>
        <tr><td class="mono">401</td><td>คีย์ไม่ถูกต้องหรือถูกยกเลิกแล้ว</td><td>ไปที่แดชบอร์ดเพื่อสร้างคีย์ใหม่</td></tr>
        <tr><td class="mono">402</td><td>เครดิตไม่พอ</td><td>เติมเครดิตที่หน้า “เติมเครดิต”</td></tr>
        <tr><td class="mono">404</td><td>โมเดลไม่ถูกต้อง</td><td>ใช้ <span class="mono">${esc(model)}</span> เท่านั้น</td></tr>
        <tr><td class="mono">429</td><td>เรียกใช้งานถี่เกิน 30 ครั้ง/นาที</td><td>รอสักครู่แล้วลองใหม่</td></tr>
        <tr><td class="mono">502/503</td><td>ระบบขัดข้องชั่วคราว</td><td>ลองใหม่ภายหลัง (ไม่คิดเงิน)</td></tr>
      </tbody>
    </table></div>

    <h2 style="margin-top:26px">ข้อควรรู้</h2>
    <div class="card small" style="line-height:1.7">
      · ระบบจำกัด <span class="mono">max_tokens</span> สูงสุด 8,192 โทเคนต่อครั้ง แม้คำขอจะขอมากกว่า — คำตอบอาจถูกตัดกลาง<br>
      · โมเดลนี้คิดวิเคราะห์ก่อนตอบ — ควรตั้ง <span class="mono">max_tokens</span> อย่างน้อย 256–512 เพื่อให้ได้คำตอบ<br>
      · เราเก็บเฉพาะจำนวนโทเคนและสถานะ — ไม่เก็บข้อความที่คุณส่งหรือคำตอบของโมเดล<br>
      · คำขอถูกประมวลผลผ่านผู้ให้บริการโมเดล ซึ่งมีนโยบายข้อมูลของตนเอง<br>
      · เครดิตถูกหักตามการใช้จริงหลังจบคำขอ — ถ้าการเชื่อมต่อหลุดและไม่ได้ข้อมูลการใช้ ระบบจะประมาณและติดป้าย “ประมาณ”
    </div>
  </section>`;
  return layout({ title: 'เอกสาร API — JapexisKey', content, active: 'docs', user });
}

export function statsPage({ health, plans, settings, baseUrl, user = null }) {
  const content = `
  <section style="padding-top:36px">
    <h1 style="font-size:28px;margin:0">สถานะระบบ</h1>
    <p class="sub">ข้อมูลสดจากฐานข้อมูล — อัปเดตทุกครั้งที่โหลดหน้านี้</p>
    <div class="kpis">
      <div class="kpi"><div class="k">ฐานข้อมูล</div><div class="v">${health.db ? 'ปกติ' : 'ขัดข้อง'}</div><div class="u">${health.dbMs} ms</div></div>
      <div class="kpi"><div class="k">ต้นทางโมเดล</div><div class="v">${health.upstreamConfigured ? 'ตั้งค่าแล้ว' : 'ไม่พร้อม'}</div><div class="u">${esc(health.upstreamHost)}</div></div>
      <div class="kpi"><div class="k">โมเดลที่เปิดขาย</div><div class="v mono" style="font-size:15px">${esc(settings.public_model || '')}</div><div class="u">ล็อกโมเดลเดียว</div></div>
      <div class="kpi"><div class="k">Base URL</div><div class="v mono" style="font-size:13px">${esc(baseUrl)}/v1</div><div class="u">OpenAI-compatible</div></div>
    </div>
    <h2 style="margin-top:26px">แผนที่เปิดขาย</h2>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>รหัส</th><th>ชื่อ</th><th class="num">ราคา</th><th class="num">เครดิต</th></tr></thead>
      <tbody>${plans.map((p) => `<tr><td class="mono">${esc(p.code)}</td><td>${esc(p.name)}</td><td class="num">฿${thb(p.price_thb, 0)}</td><td class="num">฿${thb(p.credit_thb, 0)}</td></tr>`).join('')}</tbody>
    </table></div>
  </section>`;
  return layout({ title: 'สถานะระบบ — JapexisKey', content, active: 'stats', user });
}

export function adminLogin({ error = '' }) {
  const content = `
  <section style="padding-top:42px">
    <h1 style="font-size:28px">แอดมิน</h1>
    <p class="sub">ใส่รหัสแอดมิน (ADMIN_TOKEN) ที่ตั้งไว้ใน Environment Variables</p>
    ${error ? `<div class="flash err">${esc(error)}</div>` : ''}
    <form class="form" method="post" action="/admin/login">
      <label class="lbl" for="token">รหัสแอดมิน</label>
      <input class="input" type="password" id="token" name="token" required autocomplete="off">
      <button class="btn primary" type="submit">เข้า</button>
    </form>
  </section>`;
  return layout({ title: 'แอดมิน — JapexisKey', content, user, noindex: true });
}

export function adminHome({ pending, paid, flash, totals, rows, user = null }) {
  const pendingRows = pending.map((o) => `
      <tr>
        <td class="mono">${esc(o.ref)}</td>
        <td>${esc(o.email)}</td>
        <td>${esc(o.plan_code)}</td>
        <td class="num">฿${thb(o.amount_thb, 0)}</td>
        <td class="num">฿${thb(o.credit_thb, 0)}</td>
        <td>${dt(o.created_at)}</td>
        <td class="small">${esc(o.payer_note || '')}</td>
        <td class="nowrap">
          <form method="post" action="/admin/orders/${o.id}/approve" style="display:inline"><button class="btn sm primary" type="submit">อนุมัติ</button></form>
          <form method="post" action="/admin/orders/${o.id}/reject" style="display:inline" onsubmit="return confirm('ยกเลิกออเดอร์นี้?')"><button class="btn sm danger" type="submit">ยกเลิก</button></form>
        </td>
      </tr>`).join('') || `<tr><td colspan="8" class="small">ไม่มีออเดอร์ค้าง</td></tr>`;

  const paidRows = paid.map((o) => `
      <tr><td class="mono">${esc(o.ref)}</td><td>${esc(o.email)}</td><td>${esc(o.plan_code)}</td><td class="num">฿${thb(o.amount_thb, 0)}</td><td>${dt(o.paid_at)}</td><td>${esc(o.approved_by || '')}</td></tr>`).join('')
    || `<tr><td colspan="6" class="small">ยังไม่มีออเดอร์ที่ชำระแล้ว</td></tr>`;

  const usageRows = rows.map((r) => `
      <tr><td>${dt(r.created_at)}</td><td>${esc(r.email)}</td><td>${httpChip(r.status)}</td><td class="num">${tok(r.prompt_tokens)}</td><td class="num">${tok(r.completion_tokens)}</td><td class="num">${tok(r.cache_read_tokens)}</td><td class="num">฿${thb(r.cost_thb, 4)}</td></tr>`).join('');

  const content = `
  <section style="padding-top:36px">
    <div class="row"><h1 style="font-size:26px;margin:0">แอดมิน</h1><div class="spacer"></div>
      <a class="btn sm ghost" href="/admin/users">ผู้ใช้</a>
      <a class="btn sm ghost" href="/admin/settings">ตั้งค่า</a>
      <a class="btn sm ghost" href="/admin/usage">Usage</a>
      <form method="post" action="/admin/logout"><button class="btn sm" type="submit">ออก</button></form>
    </div>
    ${flash ? `<div class="flash ok">${esc(flash)}</div>` : ''}
    <div class="kpis" style="margin-top:16px">
      <div class="kpi"><div class="k">ผู้ใช้</div><div class="v">${tok(totals.users)}</div><div class="u">บัญชี</div></div>
      <div class="kpi"><div class="k">เครดิตคงเหลือรวม</div><div class="v">฿${thb(totals.balance, 2)}</div><div class="u">หนี้สินที่ยังไม่ถูกใช้</div></div>
      <div class="kpi"><div class="k">รายรับ (approved)</div><div class="v">฿${thb(totals.revenue, 2)}</div><div class="u">ออเดอร์ที่ชำระ</div></div>
      <div class="kpi"><div class="k">Usage 30 วัน</div><div class="v">฿${thb(totals.cost30, 3)}</div><div class="u">ต้นทุนขาย</div></div>
    </div>

    <h2 style="margin-top:24px">รอตรวจสอบ (${pending.length})</h2>
    <div class="tbl-wrap" style="margin-top:10px"><table class="tbl">
      <thead><tr><th>Ref</th><th>ผู้ใช้</th><th>แผน</th><th class="num">ยอด</th><th class="num">เครดิต</th><th>สร้าง</th><th>โน้ต</th><th></th></tr></thead>
      <tbody>${pendingRows}</tbody>
    </table></div>

    <h2 style="margin-top:24px">ชำระแล้วล่าสุด</h2>
    <div class="tbl-wrap" style="margin-top:10px"><table class="tbl">
      <thead><tr><th>Ref</th><th>ผู้ใช้</th><th>แผน</th><th class="num">ยอด</th><th>อนุมัติเมื่อ</th><th>โดย</th></tr></thead>
      <tbody>${paidRows}</tbody>
    </table></div>

    <h2 style="margin-top:24px">Usage ล่าสุด</h2>
    <div class="tbl-wrap" style="margin-top:10px"><table class="tbl">
      <thead><tr><th>เวลา</th><th>ผู้ใช้</th><th>สถานะ</th><th class="num">in</th><th class="num">out</th><th class="num">cache r</th><th class="num">ต้นทุน</th></tr></thead>
      <tbody>${usageRows || '<tr><td colspan="7" class="small">ไม่มีข้อมูล</td></tr>'}</tbody>
    </table></div>
  </section>`;
  return layout({ title: 'แอดมิน — JapexisKey', content, user, noindex: true });
}

export function adminUsers({ users, flash, user = null }) {
  const rows = users.map((u) => `
      <tr>
        <td>${esc(u.email)}</td>
        <td class="num">฿${thb(u.balance_thb, 3)}</td>
        <td>${dt(u.created_at)}</td>
        <td class="num">${tok(u.requests)}</td>
        <td class="num">฿${thb(u.spent, 3)}</td>
        <td>${u.role === 'admin' ? 'admin' : 'user'} · ${esc(u.status)}</td>
        <td>
          <form method="post" action="/admin/users/${u.id}/credit" style="display:flex;gap:6px;align-items:center">
            <input class="input" name="amount" type="number" step="0.01" min="-10000" max="10000" placeholder="฿" style="width:92px;padding:6px 8px">
            <input class="input" name="note" placeholder="เหตุผล" style="width:130px;padding:6px 8px">
            <button class="btn sm" type="submit">ปรับ</button>
          </form>
        </td>
      </tr>`).join('');
  const content = `
  <section style="padding-top:36px">
    <div class="row"><h1 style="font-size:26px;margin:0">ผู้ใช้</h1><div class="spacer"></div><a class="btn sm ghost" href="/admin">← กลับ</a></div>
    ${flash ? `<div class="flash ok">${esc(flash)}</div>` : ''}
    <p class="sub" style="margin-top:8px">ปรับเครดิตด้วยมือได้ (บวก = เติม, ลบ = หัก) ทุกครั้งจะลง ledger</p>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>อีเมล</th><th class="num">เครดิต</th><th>สมัคร</th><th class="num">req</th><th class="num">ใช้จ่าย</th><th>สถานะ</th><th>ปรับเครดิต</th></tr></thead>
      <tbody>${rows || '<tr><td colspan="7" class="small">ยังไม่มีผู้ใช้</td></tr>'}</tbody>
    </table></div>
  </section>`;
  return layout({ title: 'ผู้ใช้ — JapexisKey', content, user, noindex: true });
}

export function adminSettings({ settings, flash, user = null, model = '' }) {
  const f = (key, label, hint = '', type = 'text', step = '') => `
      <label class="lbl" for="${key}">${label}</label>
      <input class="input" id="${key}" name="${key}" type="${type}" ${step ? `step="${step}"` : ''} value="${esc(settings[key] ?? '')}">
      ${hint ? `<div class="small" style="margin-top:4px">${hint}</div>` : ''}`;
  const content = `
  <section style="padding-top:36px">
    <div class="row"><h1 style="font-size:26px;margin:0">ตั้งค่า</h1><div class="spacer"></div><a class="btn sm ghost" href="/admin">← กลับ</a></div>
    ${flash ? `<div class="flash ok">${esc(flash)}</div>` : ''}
    <form method="post" action="/admin/settings" class="form" style="max-width:560px;margin-top:14px">
      <h2 style="font-size:17px">รับเงิน</h2>
      ${f('promptpay_id', 'เลขพร้อมเพย์', 'เบอร์มือถือ 10 หลัก หรือเลขบัตรประชาชน 13 หลัก (ใช้สร้าง QR อัตโนมัติ)', 'text')}
      ${f('promptpay_name', 'ชื่อบัญชีพร้อมเพย์', 'แสดงให้ผู้จ่ายเห็น')}
      <hr class="hr">
      <h2 style="font-size:17px">ราคาขาย (บาท / 1M token)</h2>
      ${f('price_in_thb', 'Input', '', 'number', '0.01')}
      ${f('price_out_thb', 'Output', '', 'number', '0.01')}
      ${f('price_cache_read_thb', 'Cache read', '', 'number', '0.01')}
      <hr class="hr">
      <h2 style="font-size:17px">ระบบ</h2>
      ${f('welcome_credit_thb', 'เครดิตทดลองตอนสมัครใหม่ (บาท)', 'ให้ครั้งเดียวต่อบัญชี — ตั้ง 0 เพื่อปิด', 'number', '0.01')}
      ${f('max_output_tokens', 'max_tokens สูงสุด', '', 'number')}
      ${f('rate_limit_per_min', 'Rate limit (ครั้ง/นาที ต่อคีย์)', '', 'number')}
      <div class="small" style="margin-top:10px">โมเดลที่ขาย: <span class="mono">${esc(model || settings.public_model)}</span> (แก้ที่ env MODEL_ID)</div>
      <button class="btn primary" type="submit">บันทึก</button>
    </form>
  </section>`;
  return layout({ title: 'ตั้งค่า — JapexisKey', content, user, noindex: true });
}

export function adminUsage({ rows, totals, flash, user = null }) {
  const trs = rows.map((r) => `
      <tr><td>${dt(r.created_at)}</td><td>${esc(r.email)}</td><td>${esc(r.model)}${r.stream ? ' stream' : ''}${r.estimated ? ' est' : ''}</td><td>${httpChip(r.status)}</td><td class="num">${tok(r.prompt_tokens)}</td><td class="num">${tok(r.completion_tokens)}</td><td class="num">${tok(r.cache_read_tokens)}</td><td class="num">฿${thb(r.cost_thb, 4)}</td><td>${esc(r.ip || '')}</td><td class="small">${esc(r.error || '')}</td></tr>`).join('')
    || `<tr><td colspan="10" class="small">ไม่มีข้อมูล</td></tr>`;
  const content = `
  <section style="padding-top:36px">
    <div class="row"><h1 style="font-size:26px;margin:0">Usage ทั้งระบบ</h1><div class="spacer"></div><a class="btn sm ghost" href="/admin">← กลับ</a><a class="btn sm" href="/admin/usage.csv">CSV</a></div>
    ${flash ? `<div class="flash ok">${esc(flash)}</div>` : ''}
    <div class="kpis" style="margin-top:14px">
      <div class="kpi"><div class="k">Requests 30 วัน</div><div class="v">${tok(totals.requests)}</div><div class="u">${totals.errors} error</div></div>
      <div class="kpi"><div class="k">Input</div><div class="v">${tok(totals.pt)}</div><div class="u">tokens</div></div>
      <div class="kpi"><div class="k">Output</div><div class="v">${tok(totals.ct)}</div><div class="u">tokens</div></div>
      <div class="kpi"><div class="k">ต้นทุนรวม</div><div class="v">฿${thb(totals.cost, 3)}</div><div class="u">30 วัน</div></div>
    </div>
    <div class="tbl-wrap" style="margin-top:14px"><table class="tbl">
      <thead><tr><th>เวลา</th><th>ผู้ใช้</th><th>โมเดล</th><th>สถานะ</th><th class="num">in</th><th class="num">out</th><th class="num">cache r</th><th class="num">ต้นทุน</th><th>IP</th><th>error</th></tr></thead>
      <tbody>${trs}</tbody>
    </table></div>
  </section>`;
  return layout({ title: 'Usage — JapexisKey', content, user, noindex: true });
}

export function errorPage({ title = 'เกิดข้อผิดพลาด', message = '', code = 500, user = null }) {
  const content = `
  <section style="padding:60px 0">
    <h1 style="font-size:26px">${esc(title)}</h1>
    <p class="sub">${esc(message)}</p>
    <a class="btn" href="/">กลับหน้าแรก</a>
  </section>`;
  return layout({ title: `${title} — JapexisKey`, content, user, noindex: true });
}
