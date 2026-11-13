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
.nav-links{display:none;gap:20px;color:#5C6775;font-size:14px}
@media(min-width:760px){.nav-links{display:flex}}
.right{margin-left:auto;display:flex;align-items:center;gap:10px}
.balance-pill{font-size:13px;border:1px solid #1d2b3c;background:#0e1622;padding:5px 10px;border-radius:999px;color:#1D4ED8;white-space:nowrap}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:1px solid #24344a;background:#101a28;color:#e8eef6;padding:9px 15px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:transform .12s ease,border-color .12s ease,background .12s ease}
.btn:hover{transform:translateY(-1px);border-color:#35507a}
.btn.primary{background:linear-gradient(135deg,#29d9a8,#31bfe0);border-color:transparent;color:#04121a}
.btn.primary:hover{filter:brightness(1.06)}
.btn.ghost{background:transparent}
.btn.danger{border-color:#5a2430;color:#ff9aa6;background:#1a0f13}
.btn.big{padding:12px 20px;font-size:15px;border-radius:12px}
.btn.sm{padding:5px 10px;font-size:12.5px;border-radius:8px}
.hero{padding:54px 0 26px}
.pill{display:inline-flex;align-items:center;gap:8px;font-size:12.5px;color:#1D4ED8;border:1px solid #17382f;background:#0c1c19;padding:5px 11px;border-radius:999px;margin-bottom:16px}
.dot{width:6px;height:6px;border-radius:50%;background:#37e0b0;box-shadow:0 0 10px #37e0b0}
h1{font-size:clamp(28px,6.4vw,46px);line-height:1.15;letter-spacing:-1px;margin:0 0 14px;font-weight:800}
.grad{background:linear-gradient(100deg,#37e0b0 0%,#6aa8ff 60%,#a78bfa 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.lead{color:#5C6775;font-size:16px;max-width:620px;margin:0 0 22px}
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
.plan .credit{font-size:13px;color:#1D4ED8}
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
.tbl tfoot td{border-top:1px solid #223247;color:#1D4ED8;font-weight:600;background:#0b131d}
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
.flash.ok{background:#0e2019;border-color:#1c4234;color:#1D4ED8}
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
footer.site a{color:#5C6775}
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
.btn:disabled{opacity:.55;cursor:not-allowed}
h1,h2,h3{color:var(--ink);letter-spacing:0}
h1{line-height:1.34}
@media(max-width:600px){.nav .btn.ghost{display:none}.nav .balance-pill{display:inline-flex;font-size:12px;padding:4px 8px;min-height:auto}.brand{font-size:15px}.nav{gap:10px}}
@media(max-width:759px){
  .nav{height:auto;padding:10px 0;flex-wrap:wrap;row-gap:6px}
  .nav-links{display:flex;flex-basis:100%;order:3;gap:8px;font-size:12.5px}
  .nav-links a{flex:1 1 0;min-width:0;display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 6px;border:1px solid var(--line);border-radius:10px;background:#fff;color:var(--ink);text-align:center;line-height:1.35}
  .nav-links a:hover{color:var(--accent2)}
}
.hero{padding:52px 0 16px}
.pill{background:#fff;border:1px solid var(--line);color:var(--muted);border-radius:999px;font-size:13px;margin-bottom:18px}
.dot{background:var(--accent);box-shadow:none}
.grad{background:none;color:var(--accent);-webkit-text-fill-color:var(--accent)}
.lead{color:#4B5563}
.chips{color:var(--muted)}
.chip{background:#fff;border:1px solid var(--line);display:inline-flex;align-items:center;min-height:36px}
section{padding:30px 0}
.sub{color:var(--muted)}
.card{background:#fff;background-image:none;border:1px solid var(--line);border-radius:14px;box-shadow:0 1px 2px rgba(27,35,48,.04)}
.card .btn{width:auto;margin-top:0}
.plan .btn{width:100%;margin-top:auto}
.kpis{grid-template-columns:repeat(2,minmax(0,1fr))}
@media(min-width:700px){.kpis{grid-template-columns:repeat(4,minmax(0,1fr))}}
.two{grid-template-columns:minmax(0,1fr)}
@media(min-width:820px){.two{grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr)}}
.card,.kpi,.tbl-wrap,.row>*{min-width:0}
.url{display:inline-block;max-width:100%;vertical-align:bottom;white-space:nowrap;overflow-x:auto;overflow-y:hidden;word-break:normal}
.conn-meta{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;padding-top:12px}
.data-list{display:none}
.data-item{border:1px solid var(--line);border-radius:10px;padding:10px 12px;background:#fff}
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
.periods{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.periods .k{font-size:11.5px;color:var(--muted)}
.periods .v{font-size:15px;font-weight:700;margin-top:2px;color:var(--ink)}
.periods .u{font-size:11.5px;color:var(--muted)}
h2[id]{scroll-margin-top:84px}
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
.item .m{color:var(--muted);overflow-wrap:anywhere}
.item .m .mono{white-space:nowrap;display:inline-block;max-width:100%;overflow-x:auto;vertical-align:bottom}
.item .status{white-space:nowrap}
.warnbox{background:#FEF6E7;border:1px solid #F0DFB7;color:#7A5200}
.creditbar{display:flex;flex-wrap:wrap;align-items:flex-end;gap:12px;background:#fff;border:1px solid var(--line);border-radius:14px;padding:14px 16px;box-shadow:0 1px 2px rgba(27,35,48,.04)}
.creditbar .lbl{font-size:12.5px;color:var(--muted)}
.creditbar .bal{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:30px;font-weight:700;letter-spacing:-.5px;line-height:1.25;color:var(--ink)}
.creditbar .note{font-size:12.5px;color:var(--muted);margin-top:2px;max-width:52ch}
.creditbar.is-low{background:#FEF6E7;border-color:#F0DFB7}
.creditbar.is-low .bal{color:#7A5200}
.data-item .t{font-weight:600;color:var(--ink)}
.steps{display:grid;gap:10px}
.step{display:flex;gap:10px;align-items:flex-start}
.step .n{flex:none;width:22px;height:22px;border-radius:50%;background:var(--soft);color:var(--accent2);font-weight:700;display:grid;place-items:center;font-size:12.5px}
.step .t{font-weight:600;color:var(--ink)}
.amt-pos{color:#0F7A55;font-weight:600}
.amt-neg{color:#B42318;font-weight:600}
.keybox{background:#F7FAFF;border:1px dashed #B8CDF1}
.codebox{display:flex;flex-direction:column;padding:0}
.codebox .copy{position:static;align-self:flex-end;margin:8px 8px 0 auto}
pre.code{padding:10px 14px 14px}
.qr{box-shadow:0 1px 3px rgba(27,35,48,.08)}
footer.site{border-top:1px solid var(--line);color:var(--muted)}
footer.site a{color:var(--accent2);display:inline-flex;align-items:center;min-height:44px;padding:0 8px}
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
  .plans{gap:8px}
  .desk-only{display:none!important}
  .chip{min-height:44px}
  header.site{position:static}
  .base-row{flex-wrap:wrap}
  .base-row .btn{width:100%}
  .creditbar{padding:12px 14px;gap:8px;align-items:center}
  .creditbar .bal{font-size:26px}
  .creditbar .note{max-width:none}
  .creditbar .btn{width:100%}
  .url{font-size:11.5px!important;line-height:1.5}
  .plan{gap:6px;padding:12px 14px}
  .plan .price{font-size:26px}
  .plan .note{min-height:0;font-size:12.5px}
  .tbl-wrap{-webkit-overflow-scrolling:touch}
  .conn-meta{grid-template-columns:1fr}
  .data-list{display:grid;gap:8px}
  .usage-table{display:none}
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
    <a href="/pricing"${active === 'buy' ? ' style="color:#1B2330;font-weight:600"' : ''}>ราคา</a>
    <a href="/docs"${active === 'docs' ? ' style="color:#1B2330;font-weight:600"' : ''}>เอกสาร API</a>
    ${user && user.role === 'admin' ? `<a href="/stats"${active === 'stats' ? ' style="color:#1B2330;font-weight:600"' : ''}>สถานะระบบ</a>` : ''}
  </div>
  <div class="right">${navUser}</div>
</div></header>
<main class="wrap">${content}</main>
<footer class="site"><div class="wrap" style="padding:0">
  <div class="row">
    <div>© ${new Date().getFullYear()} JapexisKey · <a href="/privacy">ความเป็นส่วนตัว</a></div>
    <div class="spacer"></div>
    <div><a href="/docs">API</a> · <a href="/pricing">ราคา</a> · <a href="/status">สถานะ</a> · ${user ? '<a href="/logout">ออกจากระบบ</a>' : '<a href="/login">เข้าสู่ระบบ</a>'}</div>
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

export function landing({ plans, prices, baseUrl, google = false, model = 'deepseek-v4.1-flash', user = null, payReady = true }) {
  const planCopy = {
    A: { name: 'A · เริ่มต้น', badge: '', note: 'สำหรับเริ่มต้นใช้งาน' },
    B: { name: 'B · ใช้งานประจำ', badge: 'เครดิตเพิ่ม 10%', note: 'สำหรับการใช้งานต่อเนื่อง' },
    C: { name: 'C · ปริมาณมาก', badge: 'เครดิตเพิ่ม 20%', note: 'สำหรับการใช้งานปริมาณมาก' },
  };
  const planCards = plans.map((p) => {
    const pc = planCopy[p.code] || { name: p.name, badge: p.badge, note: p.note };
    return `
      <div class="card plan">
        ${pc.badge ? `<span class="badge">${esc(pc.badge)}</span>` : ''}
        <div class="name">${esc(pc.name)}</div>
        <div class="price">฿${thb(p.price_thb, 0)}<small>ครั้งเดียว</small></div>
        <div class="credit">ได้เครดิต ฿${thb(p.credit_thb, 0)} ${Number(p.credit_thb) > Number(p.price_thb) ? `<span style="color:#5C6775">(+${Math.round((Number(p.credit_thb) / Number(p.price_thb) - 1) * 100)}%)</span>` : ''}</div>
        <div class="note">${esc(pc.note || '')}</div>
        ${payReady
          ? `<a class="btn ${p.code === 'B' ? 'primary' : ''}" href="/buy/${esc(p.code)}">สั่งซื้อแผน ${esc(p.code)}</a>`
          : `<a class="btn" href="/pricing">ดูรายละเอียดแผน ${esc(p.code)}</a>`}
      </div>`;
  }).join('');

  const content = `
  <section class="hero">
    <span class="pill"><span class="dot"></span> ทดลองใช้ฟรี ฿10 สำหรับบัญชีใหม่</span>
    <h1>คีย์ API ราคาบาท<br><span class="grad">เติมเครดิตล่วงหน้า หักตามการใช้จริง</span></h1>
    <p class="lead">คีย์ API สำหรับแอปและ SDK ที่รองรับ OpenAI API · เริ่มต้น ฿10 · ไม่มีค่าสมัครหรือค่าบริการรายเดือน · โมเดล DeepSeek V4.1 Flash</p>
    <div class="cta">
      <a class="btn primary big" href="${google ? '/auth/google' : '/login'}">${google ? 'สมัครด้วย Google' : 'เข้าสู่ระบบ'}</a>
      <a class="btn ghost big" href="/docs">ดูวิธีใช้ API</a>
    </div>
    <div class="chips">
      <span class="chip">${payReady ? 'ชำระผ่าน PromptPay' : 'ยังไม่เปิดรับชำระเงินออนไลน์'}</span>
      <span class="chip">ไม่จัดเก็บข้อความที่ส่ง</span>
    </div>
  </section>

  <section>
    <h2>เติมเครดิต</h2>
    <p class="sub">${payReady ? 'ชำระครั้งเดียว เครดิตจะเติมเข้าบัญชีหลังตรวจสอบการชำระเงิน' : 'เครดิตจะเติมเข้าบัญชีหลังตรวจสอบการชำระเงิน · ขณะนี้ยังไม่เปิดรับชำระเงินออนไลน์'}</p>
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
              <tr><td>โทเคนขาเข้า (ข้อความที่ส่ง)</td><td class="num">฿${thb(prices.in, 2)}</td></tr>
              <tr><td>โทเคนขาออก (คำตอบ)</td><td class="num">฿${thb(prices.out, 2)}</td></tr>
              <tr><td>โทเคนจากแคช</td><td class="num">฿${thb(prices.cacheRead, 2)}</td></tr>
            </tbody>
          </table>
        </div>
        <p class="small" style="margin:10px 0 0">คิดตามจำนวนโทเคนที่ใช้จริง ไม่มีค่าบริการขั้นต่ำต่อคำขอ</p>
      </div>
      <div class="card">
        <h2 style="font-size:18px">วิธีใช้งาน</h2>
        <div class="list" style="margin-top:12px">
          <div class="item"><div class="l"><div class="t">1. สมัครและรับคีย์</div><div class="m">คีย์จะแสดงเต็มเพียงครั้งเดียวเมื่อสร้าง</div></div></div>
          <div class="item"><div class="l"><div class="t">2. เติมเครดิต</div><div class="m">เลือกแผนที่ต้องการ · ${payReady ? 'ชำระผ่าน PromptPay' : 'ยังไม่เปิดรับชำระเงินออนไลน์'}</div></div></div>
          <div class="item"><div class="l"><div class="t">3. เชื่อมต่อแอปที่ใช้งาน</div><div class="m">กำหนดที่อยู่ API (Base URL) <span class="mono">${esc(baseUrl)}/v1</span> และใช้คีย์ของคุณ</div></div></div>
        </div>
        <div class="codebox"><button class="btn sm copy" data-copy="curl ${esc(baseUrl)}/v1/chat/completions -H &quot;Authorization: Bearer JXK-YOUR-KEY&quot; -H &quot;Content-Type: application/json&quot; -d '{&quot;model&quot;:&quot;${esc(model)}&quot;,&quot;messages&quot;:[{&quot;role&quot;:&quot;user&quot;,&quot;content&quot;:&quot;สวัสดี&quot;}]}'">คัดลอก</button><pre class="code">curl ${esc(baseUrl)}/v1/chat/completions \\
  -H "Authorization: Bearer JXK-YOUR-KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"${esc(model)}","messages":[{"role":"user","content":"สวัสดี"}]}'</pre></div>
        <p class="small" style="margin:0">คีย์จะแสดงเต็มเพียงครั้งเดียวเมื่อสร้าง หากไม่ได้จัดเก็บไว้ ให้สร้างคีย์ใหม่ในแดชบอร์ด</p>
      </div>
    </div>
  </section>

  <section>
    <h2>คำถามที่พบบ่อย</h2>
    <div class="two" style="margin-top:12px">
      <div class="card list" style="gap:14px">
        <div><div class="t" style="font-weight:700">รองรับแอปและเครื่องมือใดบ้าง</div><div class="small">แอปพลิเคชันหรือ SDK ที่รองรับ OpenAI API เช่น Cursor, Cline, OpenCode และ n8n โดยกำหนดที่อยู่ API (Base URL) และใช้คีย์ของคุณ</div></div>
        <div><div class="t" style="font-weight:700">เครดิตมีวันหมดอายุหรือไม่</div><div class="small">ไม่มีวันหมดอายุ ใช้ได้จนกว่าเครดิตจะหมด แล้วจึงเติมครั้งถัดไป</div></div>
        <div><div class="t" style="font-weight:700">ชำระเงินอย่างไร</div><div class="small">บัญชีใหม่ได้รับเครดิตทดลอง ฿10 เมื่อเข้าสู่ระบบครั้งแรก · ${payReady ? 'เติมเครดิตผ่าน PromptPay แล้วแจ้งเลขอ้างอิงสลิปหรือเวลาโอน เจ้าหน้าที่จะตรวจสอบและเติมเครดิตให้' : 'ปัจจุบันยังไม่เปิดรับชำระเงินออนไลน์ กรุณา<a href="/help">ติดต่อฝ่ายบริการลูกค้า</a>เพื่อรับข้อมูลการเติมเครดิต'}</div></div>
      </div>
      <div class="card list" style="gap:14px">
        <div><div class="t" style="font-weight:700">ประวัติการใช้งานละเอียดเพียงใด</div><div class="small">ทุกคำขอแสดงเวลา สถานะ จำนวนโทเคนขาเข้าและขาออก โทเคนจากแคช และค่าใช้จ่ายเป็นบาท — ดาวน์โหลดเป็น CSV ได้</div></div>
        <div><div class="t" style="font-weight:700">ระบบจัดเก็บข้อมูลใดบ้าง</div><div class="small">ระบบจัดเก็บเฉพาะจำนวนโทเคน สถานะการใช้งาน และข้อมูลบัญชี — ไม่จัดเก็บข้อความที่คุณส่งหรือคำตอบของโมเดล</div></div>
        <div><div class="t" style="font-weight:700">มีโมเดลใดให้บริการ</div><div class="small">ปัจจุบันให้บริการหนึ่งโมเดล: DeepSeek V4.1 Flash — เหมาะสำหรับงานสนทนาและสรุปเนื้อหา</div></div>
      </div>
    </div>
  </section>`;
  return layout({ title: 'JapexisKey — คีย์ AI ราคาบาท เริ่ม ฿10', content, active: 'home', user });
}

export function pricingPage({ plans, prices, user = null, payReady = true, model = 'deepseek-v4.1-flash', flash = '' }) {
  const planCopy = {
    A: { name: 'A · เริ่มต้น', badge: '', note: 'สำหรับเริ่มต้นใช้งาน' },
    B: { name: 'B · ใช้งานประจำ', badge: 'เครดิตเพิ่ม 10%', note: 'สำหรับการใช้งานต่อเนื่อง' },
    C: { name: 'C · ปริมาณมาก', badge: 'เครดิตเพิ่ม 20%', note: 'สำหรับการใช้งานปริมาณมาก' },
  };
  const cards = plans.map((p) => {
    const pc = planCopy[p.code] || { name: p.name, badge: p.badge, note: p.note };
    const credit = Number(p.credit_thb || 0);
    const inRate = Number(prices && prices.in ? prices.in : 0);
    const tokIn = inRate > 0 ? (credit / inRate) * 1000000 : 0;
    const tokLine = tokIn > 0
      ? `≈ ${tokIn >= 1000000 ? (tokIn / 1000000).toFixed(1) + ' ล้านโทเคนขาเข้า' : tok(Math.round(tokIn)) + ' โทเคนขาเข้า'}`
      : '';
    const cta = !payReady
      ? '<button class="btn" type="button" disabled>ยังไม่เปิดรับชำระเงิน</button>'
      : user
        ? `<a class="btn ${p.code === 'B' ? 'primary' : ''}" href="/buy/${esc(p.code)}">สั่งซื้อแผน ${esc(p.code)}</a>`
        : `<a class="btn ${p.code === 'B' ? 'primary' : ''}" href="/login">เข้าสู่ระบบเพื่อสั่งซื้อ</a>`;
    return `
      <div class="card plan">
        ${pc.badge ? `<span class="badge">${esc(pc.badge)}</span>` : ''}
        <div class="name">${esc(pc.name)}</div>
        <div class="price">฿${thb(p.price_thb, 0)}<small>จ่ายครั้งเดียว</small></div>
        <div class="credit">ได้เครดิต ฿${thb(p.credit_thb, 2)}</div>
        ${tokLine ? `<div class="small">${tokLine}</div>` : ''}
        <div class="note">${esc(pc.note || '')}</div>
        ${cta}
      </div>`;
  }).join('');

  const content = `
  <section style="padding-top:36px">
    <h1 style="font-size:28px;margin:0">ราคาและแผน</h1>
    <p class="sub" style="margin:6px 0 14px">ชำระครั้งเดียว เครดิตไม่มีวันหมดอายุ · บัญชีใหม่ได้รับเครดิตทดลอง ฿10 เมื่อเข้าสู่ระบบครั้งแรก</p>
    ${flash ? `<div class="flash info">${esc(flash)}</div>` : ''}
    ${payReady ? '' : `<div class="warnbox" style="margin:0 0 14px"><b>ยังไม่เปิดรับชำระเงินออนไลน์</b><div class="small" style="margin-top:4px">ขณะนี้ยังสร้างคำสั่งซื้อไม่ได้ — กรุณา<a href="/help">ติดต่อฝ่ายบริการลูกค้า</a></div></div>`}
    <div class="plans">${cards}</div>
    <div class="warnbox" style="margin-top:16px">
      <div>โมเดล: <b>DeepSeek V4.1 Flash</b> (<span class="mono">${esc(model)}</span>)</div>
      <div style="margin-top:4px">อัตราค่าใช้จ่ายต่อ 1 ล้านโทเคน: ขาเข้า ฿${thb(prices.in, 2)} · ขาออก ฿${thb(prices.out, 2)} · จากแคช ฿${thb(prices.cacheRead, 2)}</div>
      <div style="margin-top:4px">${payReady ? 'ชำระผ่าน PromptPay แล้วแจ้งเลขอ้างอิงสลิปหรือเวลาโอน เจ้าหน้าที่จะตรวจสอบและเติมเครดิตให้' : 'เมื่อเปิดรับชำระเงินแล้ว เครดิตจะเติมเข้าบัญชีหลังตรวจสอบการชำระเงิน'}</div>
    </div>
    <div class="row" style="margin-top:16px">
      ${user ? '<a class="btn primary" href="/app">ไปที่แดชบอร์ด</a>' : '<a class="btn primary" href="/login">เข้าสู่ระบบเพื่อเริ่มใช้งาน</a>'}
      <a class="btn" href="/docs">เอกสาร API</a>
    </div>
  </section>`;
  return layout({ title: 'ราคาและแผน — JapexisKey', content, active: 'buy', user });
}

export function authPage({ mode, error = '', google = false, notice = '' }) {
  const isSignup = mode === 'signup';
  const content = `
  <section style="padding-top:42px">
    <h1 style="font-size:30px">เข้าสู่ระบบหรือสมัครใช้งาน</h1>
    <p class="sub">ดำเนินการต่อด้วยบัญชี Google · บัญชีใหม่ได้รับเครดิตทดลอง ฿10</p>
    ${error ? `<div class="flash err">${esc(error)}</div>` : ''}
    ${notice ? `<div class="flash info">${esc(notice)}</div>` : ''}
    ${google
      ? `<a class="btn primary" href="/auth/google" style="width:100%;max-width:430px">ดำเนินการต่อด้วย Google</a>
         <p class="small" style="margin-top:16px">หากยังไม่มีบัญชี ระบบจะสร้างบัญชีใหม่โดยอัตโนมัติ</p>`
      : `<div class="warnbox" style="max-width:430px">ระบบเข้าสู่ระบบด้วย Google ยังไม่เปิดใช้งาน กรุณาติดต่อฝ่ายบริการลูกค้า</div>`}
  </section>`;
  return layout({ title: `เข้าสู่ระบบ — JapexisKey`, content, noindex: true });
}

export function dashPage({ user, keys, newKey, stats, recent, orders, baseUrl, model, flash, credit = null }) {
  const keyStatus = (k) => (k.revoked ? '<span class="status s-err">ปิดใช้งาน</span>' : '<span class="status s-ok">ใช้งานอยู่</span>');
  const revokeBtn = (k) => (k.revoked ? '' : `<form method="post" action="/app/keys/${k.id}/revoke" onsubmit="return confirm('ปิดใช้งานคีย์นี้? แอปที่ใช้คีย์นี้จะใช้งานไม่ได้ทันที')"><button class="btn sm danger" type="submit">ปิดใช้งาน</button></form>`);

  const keyRows = keys.map((k) => `
      <tr>
        <td>${esc(k.name === 'default' ? 'คีย์หลัก' : k.name)}</td>
        <td class="mono">${esc(k.prefix)}…</td>
        <td class="hide-sm">${dt(k.created_at)}</td>
        <td class="hide-sm">${k.last_used_at ? dt(k.last_used_at) : '-'}</td>
        <td>${keyStatus(k)}</td>
        <td style="text-align:right">${revokeBtn(k)}</td>
      </tr>`).join('');

  const keyItems = keys.map((k) => `
      <div class="data-item">
        <div class="row"><span class="t">${esc(k.name === 'default' ? 'คีย์หลัก' : k.name)}</span><div class="spacer"></div>${keyStatus(k)}</div>
        <div class="small mono" style="margin-top:2px">${esc(k.prefix)}…</div>
        <div class="small">สร้าง ${dt(k.created_at)} · ใช้ล่าสุด ${k.last_used_at ? dt(k.last_used_at) : '-'}</div>
        ${revokeBtn(k) ? `<div style="margin-top:8px">${revokeBtn(k)}</div>` : ''}
      </div>`).join('') || '<div class="data-item small">ยังไม่มีคีย์</div>';

  const usageRows = recent.map((r) => `
      <tr>
        <td>${dt(r.created_at)}</td>
        <td>${httpChip(r.status)}</td>
        <td class="num">${tok(r.prompt_tokens)}</td>
        <td class="num">${tok(r.completion_tokens)}</td>
        <td class="num hide-sm">${tok(r.cache_read_tokens)}</td>
        <td class="num">${money(r.cost_thb)}</td>
      </tr>`).join('') || `<tr><td colspan="6" class="small">ยังไม่มีการใช้งาน — เริ่มได้จากตัวอย่างโค้ดด้านล่าง</td></tr>`;

  const usageItems = recent.map((r) => `
      <div class="data-item">
        <div class="row"><span class="t">${dt(r.created_at)}</span><div class="spacer"></div>${httpChip(r.status)}</div>
        <div class="small" style="margin-top:2px">โทเคนขาเข้า ${tok(r.prompt_tokens)} · ขาออก ${tok(r.completion_tokens)} · จากแคช ${tok(r.cache_read_tokens)}</div>
        <div class="row" style="margin-top:2px"><div class="small">ค่าใช้จ่าย</div><div class="spacer"></div><div class="mono">${money(r.cost_thb)}</div></div>
      </div>`).join('') || '<div class="data-item small">ยังไม่มีการใช้งาน — เริ่มได้จากตัวอย่างโค้ดด้านล่าง <a href="/docs">ดูวิธีเชื่อมต่อ</a></div>';

  const apiItems = [
    ['POST', '/v1/chat/completions', 'ส่งคำถามและรับคำตอบ (รองรับสตรีม)'],
    ['GET', '/v1/models', 'รายการโมเดลที่ให้บริการ'],
    ['GET', '/v1/me', 'เครดิตคงเหลือและสรุปการใช้งาน'],
    ['GET', '/v1/usage', 'ประวัติการใช้งานล่าสุด'],
  ].map(([m, p, d]) => `
      <div class="data-item">
        <div class="mono small">${m}</div>
        <div class="mono" style="font-size:12.5px;overflow-wrap:anywhere">${esc(p)}</div>
        <div class="small">${esc(d)}</div>
      </div>`).join('');

  const bal = Number(user.balance_thb || 0);
  const est = credit && credit.estRequests != null ? Number(credit.estRequests) : null;
  const low = Boolean(credit && credit.low);
  const basis = credit && credit.basis === 'last' ? 'อิงจากคำขอล่าสุด' : 'จากค่าใช้จ่ายเฉลี่ย 30 วัน';
  const estText = est == null ? '' : est > 9999 ? 'มากกว่า 10,000 คำขอ' : `ประมาณ ${tok(est)} คำขอ`;
  const remainNote = bal <= 0
    ? 'เครดิตหมดแล้ว — เติมเพื่อใช้งานต่อ'
    : low
      ? (est != null
        ? `เครดิตใกล้หมด — เหลือ${estText} (${basis})`
        : 'เครดิตใกล้หมด เติมก่อนเพื่อไม่ให้คำขอถูกปฏิเสธ (402)')
      : est != null
        ? `เหลือใช้ได้${estText} (${basis})`
        : 'เครดิตพร้อมใช้ — ยังไม่มีข้อมูลการใช้';
  const creditBar = `
    <div class="creditbar${low ? ' is-low' : ''}" style="margin-top:16px">
      <div>
        <div class="lbl">เครดิตคงเหลือ</div>
        <div class="bal">฿${thb(bal, 2)}</div>
        <div class="note">${remainNote} · <a href="/app/credit" style="color:var(--accent2);font-weight:600">ประวัติเครดิต</a></div>
      </div>
      <div class="spacer"></div>
      <a class="btn primary" href="/buy">เติมเครดิต</a>
    </div>`;

  const kpiBlock = stats.requests > 0 ? `
    <div class="kpis" style="margin-top:14px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))">
      <div class="kpi"><div class="k">คำขอใน 30 วัน</div><div class="v">${tok(stats.requests)}</div><div class="u">รวมทุกสถานะ</div></div>
      <div class="kpi"><div class="k">โทเคนใน 30 วัน</div><div class="v">${tok(Number(stats.pt) + Number(stats.ct))}</div><div class="u">โทเคนขาเข้า ${tok(stats.pt)} · ขาออก ${tok(stats.ct)}</div></div>
      <div class="kpi"><div class="k">ค่าใช้จ่ายใน 30 วัน</div><div class="v">${money(stats.cost)}</div><div class="u">โทเคนจากแคช ${tok(stats.cat)}</div></div>
    </div>` : '';

  const onboarding = stats.requests > 0 ? '' : `
    <div class="card" style="margin-top:16px">
      <h2 style="font-size:17px;margin:0">เริ่มใช้งาน 3 ขั้น</h2>
      <div class="steps" style="margin-top:12px">
        <div class="step"><div class="n">1</div><div><div class="t">คัดลอกคีย์ API</div><div class="small">${keys.length ? `คีย์ ${esc(keys[0].prefix)}… ใช้ยืนยันตัวตน — คีย์เต็มแสดงเพียงครั้งเดียวเมื่อสร้าง ถ้าไม่ได้จัดเก็บไว้ ให้สร้างใหม่` : 'ยังไม่มีคีย์ — สร้างคีย์ใหม่ก่อน แล้วคัดลอกจัดเก็บไว้'}</div></div></div>
        <div class="step"><div class="n">2</div><div><div class="t">ตั้งค่าแอปให้เรียก API</div><div class="small">ที่อยู่ API <span class="mono">${esc(baseUrl)}/v1</span> · ตัวอย่างโค้ดอยู่ในเอกสาร API</div></div></div>
        <div class="step"><div class="n">3</div><div><div class="t">ใช้งานและเติมเครดิตเมื่อใกล้หมด</div><div class="small">ระบบหักค่าใช้จ่ายตามจริงหลังจบแต่ละคำขอ</div></div></div>
      </div>
      <div class="row" style="margin-top:12px;gap:8px">
        <button class="btn sm" data-copy="${esc(baseUrl)}/v1">คัดลอกที่อยู่ API</button>
        <a class="btn sm" href="/docs">ดูตัวอย่างโค้ด</a>
        ${keys.length ? '' : '<form method="post" action="/app/keys"><button class="btn sm" type="submit">สร้างคีย์ใหม่</button></form>'}
      </div>
    </div>`;

  const usageCard = recent.length ? `
    <div class="card" style="margin-top:18px">
      <div class="row"><h2 style="font-size:17px;margin:0">ใช้งานล่าสุด</h2><div class="spacer"></div><a class="btn sm" href="/app/usage">ดูทั้งหมด</a></div>
      <div class="data-list" style="margin-top:12px">${usageItems}</div>
      <div class="tbl-wrap desk-only" style="margin-top:12px">
        <table class="tbl">
          <thead><tr><th>เวลา</th><th>สถานะ</th><th class="num">โทเคนขาเข้า</th><th class="num">ขาออก</th><th class="num">จากแคช</th><th class="num">ค่าใช้จ่าย</th></tr></thead>
          <tbody>${usageRows}</tbody>
        </table>
      </div>
    </div>` : '';

  const orderRows = orders.map((o) => `
      <div class="item">
        <div class="l"><div class="t">${esc(o.ref)} · แผน ${esc(o.plan_code)}</div><div class="m">฿${thb(o.amount_thb, 0)} → เครดิต ฿${thb(o.credit_thb, 0)} · ${dt(o.created_at)}</div></div>
        <div>${statusChip(o.status)} ${o.status !== 'paid' && o.status !== 'cancelled' ? `<a class="btn sm" href="/order/${esc(o.ref)}">ดู/จ่าย</a>` : ''}</div>
      </div>`).join('');

  const content = `
  <section style="padding-top:36px">
    <div class="row">
      <div><h1 style="font-size:26px;margin:0">ภาพรวมบัญชี</h1><p class="sub" style="margin:4px 0 0">สวัสดี${user.name ? ', ' + esc(user.name) : ''} · ที่อยู่ API: <span class="mono url">${esc(baseUrl)}/v1</span></p></div>
    </div>
    ${flash ? `<div class="flash ok">${esc(flash)}</div>` : ''}
    ${user.status !== 'active' ? '<div class="warnbox" style="margin-top:14px"><b>บัญชีนี้ถูกระงับ</b> — คีย์ทั้งหมดจะตอบ 403 จนกว่าจะคืนสิทธิ์ กรุณาติดต่อฝ่ายบริการลูกค้า</div>' : ''}
    <div class="card" style="margin-top:14px;padding:12px 14px">
      <div class="row" style="gap:10px;flex-wrap:wrap;align-items:center">
        <div><div class="small">บัญชี</div><div>${esc(user.email || '')}</div></div>
        <div class="spacer"></div>
        <div class="small">สมัคร ${dt(user.created_at)} · ${user.status === 'active' ? '<span class="status s-ok">ใช้งานอยู่</span>' : '<span class="status s-err">ถูกระงับ</span>'}</div>
      </div>
    </div>
    ${creditBar}
    ${newKey ? `<div class="keybox">
      <div style="font-weight:700;color:#1D4ED8">คีย์ใหม่ของคุณ (แสดงครั้งเดียว — คัดลอกเก็บไว้)</div>
      <div class="row" style="margin-top:8px"><span class="mono" style="font-size:13px;word-break:break-all">${esc(newKey)}</span></div>
      <div style="margin-top:10px"><button class="btn sm" data-copy="${esc(newKey)}">คัดลอกคีย์</button></div>
    </div>` : ''}
    ${onboarding}

    ${kpiBlock}

    <div class="card" style="margin-top:18px">
      <div class="row"><h2 style="font-size:17px;margin:0">คีย์ API</h2><div class="spacer"></div>
        <form method="post" action="/app/keys"><button class="btn sm" type="submit">สร้างคีย์ใหม่</button></form>
      </div>
      <div class="data-list" style="margin-top:12px">${keyItems}</div>
      <div class="tbl-wrap desk-only" style="margin-top:12px">
        <table class="tbl">
          <thead><tr><th>ชื่อ</th><th>คีย์</th><th class="hide-sm">สร้าง</th><th class="hide-sm">ใช้ล่าสุด</th><th>สถานะ</th><th></th></tr></thead>
          <tbody>${keyRows || '<tr><td colspan="6" class="small">ยังไม่มีคีย์</td></tr>'}</tbody>
        </table>
      </div>
    </div>

    ${usageCard}

    <div class="card" style="margin-top:18px">
      <div class="row"><h2 style="font-size:17px;margin:0">การเชื่อมต่อ API</h2><div class="spacer"></div><a class="btn sm" href="/docs">เอกสาร API</a></div>
      <p class="small" style="margin:6px 0 10px">ที่อยู่ API: <span class="mono url">${esc(baseUrl)}/v1</span> · การยืนยันตัวตน: <span class="mono">Authorization: Bearer &lt;คีย์&gt;</span></p>
      <div class="data-list">${apiItems}</div>
      <div class="tbl-wrap desk-only">
        <table class="tbl">
          <thead><tr><th>Method</th><th>Path</th><th>รายละเอียด</th></tr></thead>
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
        <a class="btn sm" href="/docs">ดูตัวอย่างโค้ด</a>
      </div>
    </div>

    ${orderRows ? `<div class="card" style="margin-top:18px"><h2 style="font-size:17px;margin:0 0 12px">คำสั่งซื้อของฉัน</h2><div class="list">${orderRows}</div></div>` : ''}
  </section>`;
  return layout({ title: 'แดชบอร์ด — JapexisKey', user, content, noindex: true });
}

export function buyPage({ plans, prices, user, flash, model = 'deepseek-v4.1-flash', payReady = true }) {
  const suspended = String((user && user.status) || 'active') !== 'active';
  const canBuy = payReady && !suspended;
  const planCopy = {
    A: { name: 'A · เริ่มต้น', badge: '', note: 'สำหรับเริ่มต้นใช้งาน' },
    B: { name: 'B · ใช้งานประจำ', badge: 'เครดิตเพิ่ม 10%', note: 'สำหรับการใช้งานต่อเนื่อง' },
    C: { name: 'C · ปริมาณมาก', badge: 'เครดิตเพิ่ม 20%', note: 'สำหรับการใช้งานปริมาณมาก' },
  };
  const cards = plans.map((p) => {
    const pc = planCopy[p.code] || { name: p.name, badge: p.badge, note: p.note };
    const credit = Number(p.credit_thb || 0);
    const inRate = Number(prices && prices.in ? prices.in : 0);
    const tokIn = inRate > 0 ? (credit / inRate) * 1000000 : 0;
    const tokLine = tokIn > 0
      ? `≈ ${tokIn >= 1000000 ? (tokIn / 1000000).toFixed(1) + ' ล้านโทเคนขาเข้า' : tok(Math.round(tokIn)) + ' โทเคนขาเข้า'}`
      : '';
    return `
      <div class="card plan">
        ${pc.badge ? `<span class="badge">${esc(pc.badge)}</span>` : ''}
        <div class="name">${esc(pc.name)}</div>
        <div class="price">฿${thb(p.price_thb, 0)}<small>จ่ายครั้งเดียว</small></div>
        <div class="credit">ได้เครดิต ฿${thb(p.credit_thb, 2)}</div>
        ${tokLine ? `<div class="small">${tokLine}</div>` : ''}
        <div class="note">${esc(pc.note || '')}</div>
        ${canBuy
          ? `<form method="post" action="/buy/${esc(p.code)}"><button class="btn ${p.code === 'B' ? 'primary' : ''}" type="submit">สั่งซื้อแผน ${esc(p.code)}</button></form>`
          : `<button class="btn" type="button" disabled>${suspended ? 'บัญชีถูกระงับ' : 'ยังไม่เปิดรับชำระเงิน'}</button>`}
      </div>`;
  }).join('');
  const content = `
  <section style="padding-top:36px">
    <h1 style="font-size:28px;margin:0">เติมเครดิต</h1>
    <p class="sub" style="margin:6px 0 6px">ชำระผ่าน PromptPay · เครดิตจะเติมเข้าบัญชีหลังตรวจสอบการชำระเงิน · ไม่มีวันหมดอายุ</p>
    <p class="small" style="margin:0 0 14px">เครดิตคงเหลือ <b>฿${thb(user.balance_thb, 2)}</b></p>
    ${flash ? `<div class="flash info">${esc(flash)}</div>` : ''}
    ${suspended
      ? `<div class="warnbox" style="margin:0 0 14px"><b>บัญชีนี้ถูกระงับ</b><div class="small" style="margin-top:4px">ไม่สามารถเติมเครดิตได้จนกว่าจะคืนสิทธิ์ — กรุณาติดต่อฝ่ายบริการลูกค้า</div></div>`
      : payReady
        ? `<div class="warnbox small" style="margin:0 0 14px;line-height:1.7"><b>ขั้นตอนการชำระเงิน</b> · สร้างคำสั่งซื้อ → สแกนหรือโอนผ่าน PromptPay → แจ้งเลขอ้างอิงสลิปหรือเวลาโอน → เจ้าหน้าที่ตรวจสอบแล้วเครดิตเข้าบัญชี</div>`
        : `<div class="warnbox" style="margin:0 0 14px"><b>ยังไม่เปิดรับชำระเงินออนไลน์</b><div class="small" style="margin-top:4px">ขณะนี้ยังสร้างคำสั่งซื้อไม่ได้ — กรุณา<a href="/help">ติดต่อฝ่ายบริการลูกค้า</a></div></div>`}
    <div class="plans">${cards}</div>
    <div class="warnbox" style="margin-top:16px">
      <div>โมเดล: <b>DeepSeek V4.1 Flash</b> (<span class="mono">${esc(model)}</span>)</div>
      <div style="margin-top:4px">อัตราค่าใช้จ่ายต่อ 1 ล้านโทเคน: ขาเข้า ฿${thb(prices.in, 2)} · ขาออก ฿${thb(prices.out, 2)} · จากแคช ฿${thb(prices.cacheRead, 2)}</div>
      <div style="margin-top:4px">เครดิตจะถูกหักตามปริมาณการใช้งานจริง</div>
    </div>
  </section>`;
  return layout({ title: 'เติมเครดิต — JapexisKey', user, content, noindex: true });
}

export function orderPage({ order, user, qr, settings, flash, payReady = null }) {
  const paid = order.status === 'paid';
  const canPay = payReady === null ? Boolean(String(settings.promptpay_id || '').trim()) : Boolean(payReady);
  const canNotify = canPay && order.status === 'pending';
  const content = `
  <section style="padding-top:36px">
    <a class="small" href="/app">← กลับแดชบอร์ด</a>
    <h1 style="font-size:26px;margin:10px 0 4px">คำสั่งซื้อ ${esc(order.ref)}</h1>
    <div class="row"><div class="small">แผน ${esc(order.plan_code)} · สั่งซื้อเมื่อ ${dt(order.created_at)}</div><div class="spacer"></div><div>${statusChip(order.status)}</div></div>
    ${flash ? `<div class="flash ${paid ? 'ok' : 'info'}">${esc(flash)}</div>` : ''}
    <div class="two" style="margin-top:16px">
      <div class="card">
        <div class="row">
          <div><div class="small">ยอดที่ต้องโอน</div><div style="font-size:34px;font-weight:800;letter-spacing:-1px">฿${thb(order.amount_thb, 2)}</div></div>
          <div class="spacer"></div>
          <div style="text-align:right"><div class="small">เครดิตที่จะได้</div><div style="font-size:20px;font-weight:700;color:#1D4ED8">฿${thb(order.credit_thb, 2)}</div></div>
        </div>
        <hr class="hr">
        ${canPay ? `
        <div class="small">ชำระผ่าน PromptPay ไปที่</div>
        <div class="mono" style="font-size:15px;margin:2px 0 0">${esc(settings.promptpay_id)}</div>
        <div class="small">${esc(settings.promptpay_name || '')}</div>
        <div class="row" style="margin-top:12px">
          <button class="btn sm" data-copy="${esc(settings.promptpay_id)}">คัดลอกเลขพร้อมเพย์</button>
          <button class="btn sm" data-copy="${esc(order.ref)}">คัดลอกเลขออเดอร์</button>
        </div>` : `
        <div class="warnbox small">ยังไม่เปิดรับชำระเงินออนไลน์ — กรุณาติดต่อฝ่ายบริการลูกค้า และแจ้งเลขคำสั่งซื้อ <span class="mono">${esc(order.ref)}</span></div>`}
        ${canNotify ? `<form method="post" action="/order/${esc(order.ref)}/notify" style="margin-top:16px">
          <label class="lbl" for="note">เลขอ้างอิงสลิปหรือเวลาโอน (ถ้ามี)</label>
          <input class="input" id="note" name="note" maxlength="200" placeholder="เช่น 12/11 11:24 · เลขอ้างอิง 0123456789">
          <button class="btn primary" type="submit" style="margin-top:10px">แจ้งการชำระเงิน</button>
        </form>` : ''}
        ${order.status === 'review' ? `<div class="flash info" style="margin-top:14px">ได้รับแจ้งโอนแล้ว — รอตรวจสอบการชำระเงิน ${order.payer_note ? `<br><span class="small">${esc(order.payer_note)}</span>` : ''}</div>` : ''}
        ${paid ? `<div class="flash ok" style="margin-top:14px">ชำระแล้ว เครดิตเข้าบัญชี ฿${thb(order.credit_thb, 2)}</div>` : ''}
      </div>
      <div class="card" style="display:flex;flex-direction:column;align-items:center;gap:10px">
        <div class="small">สแกนด้วยแอปธนาคาร (PromptPay)</div>
        ${qr ? `<div class="qr">${qr}</div>
        <div class="small" style="text-align:center">QR ระบุยอด ฿${thb(order.amount_thb, 2)} · เลขคำสั่งซื้อ ${esc(order.ref)}</div>` : `<div class="warnbox">${canPay
          ? `แสดง QR ไม่สำเร็จ กรุณาติดต่อฝ่ายบริการลูกค้า และแจ้งเลขคำสั่งซื้อ ${esc(order.ref)}`
          : `ยังไม่เปิดรับชำระเงินออนไลน์ — กรุณาติดต่อฝ่ายบริการลูกค้า และแจ้งเลขคำสั่งซื้อ ${esc(order.ref)}`}</div>`}
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

  const dataRows = rows.map((r) => `
      <div class="data-item">
        <div class="row"><div class="small">${dt(r.created_at)}</div><div class="spacer"></div>${httpChip(r.status)}</div>
        <div class="row" style="margin-top:4px"><div>${esc(displayModel(r.model))}${r.stream ? ' · สตรีม' : ''}${r.estimated ? ' · ประมาณ' : ''}</div><div class="spacer"></div><div class="mono">${money(r.cost_thb)}</div></div>
        <div class="small" style="margin-top:2px">ขาเข้า ${tok(r.prompt_tokens)} · ขาออก ${tok(r.completion_tokens)} · แคช ${tok(r.cache_read_tokens)} <span style="white-space:nowrap">· ${r.latency_ms ? (r.latency_ms / 1000).toFixed(1) + ' วิ' : '-'}</span></div>
      </div>`).join('') || `<div class="small">ไม่มีข้อมูลในช่วงนี้</div>`;

  const content = `
  <section style="padding-top:36px">
    <div class="row"><h1 style="font-size:26px;margin:0">ประวัติการใช้งาน</h1><div class="spacer"></div><a class="btn sm" href="/app/usage.csv?range=${range}">ดาวน์โหลด CSV</a></div>
    <p class="sub" style="margin:6px 0 10px">ทุกคำขอที่ใช้คีย์ของคุณ — นับโทเคนและค่าใช้จ่ายตามจริง (แถวที่ระบบประมาณจะติดป้าย “ประมาณ”)</p>
    <div class="row" style="margin:0 0 10px">${tabs}</div>
    ${periods ? `<div class="card" style="margin-bottom:12px;padding:12px 14px">
      <div class="periods">
        <div><div class="k">วันนี้</div><div class="v">${tok(periods.today.requests)} ครั้ง</div><div class="u">${money(periods.today.cost)} · ${tok(Number(periods.today.pt) + Number(periods.today.ct))} โทเคน</div></div>
        <div><div class="k">สัปดาห์นี้</div><div class="v">${tok(periods.week.requests)} ครั้ง</div><div class="u">${money(periods.week.cost)} · ${tok(Number(periods.week.pt) + Number(periods.week.ct))} โทเคน</div></div>
        <div><div class="k">เดือนนี้</div><div class="v">${tok(periods.month.requests)} ครั้ง</div><div class="u">${money(periods.month.cost)} · ${tok(Number(periods.month.pt) + Number(periods.month.ct))} โทเคน</div></div>
      </div>
    </div>` : ''}
    <div class="card" style="margin-bottom:12px;padding:12px 14px">
      <div class="periods">
        <div><div class="k">คำขอในช่วงที่เลือก</div><div class="v">${tok(stats.requests)}</div><div class="u">ผิดพลาด ${stats.errors} ครั้ง</div></div>
        <div><div class="k">โทเคนรวม</div><div class="v">${tok(Number(stats.pt) + Number(stats.ct))}</div><div class="u">เข้า ${tok(stats.pt)} · ออก ${tok(stats.ct)}</div></div>
        <div><div class="k">ค่าใช้จ่ายรวม</div><div class="v">${money(stats.cost)}</div><div class="u">จากแคช ${tok(stats.cat)} โทเคน</div></div>
      </div>
    </div>
    <div class="data-list">${dataRows}</div>
    <div class="tbl-wrap usage-table">
      <table class="tbl">
        <thead><tr><th>เวลา</th><th class="hide-sm">โมเดล</th><th>สถานะ</th><th class="num">เข้า</th><th class="num">ออก</th><th class="num hide-sm">จากแคช</th><th class="num">ค่าใช้จ่าย</th><th class="num hide-sm">เวลาตอบ</th></tr></thead>
        <tbody>${trs}</tbody>
      </table>
    </div>
    <p class="small" style="margin-top:10px">แสดง 300 รายการล่าสุด · ดูทั้งหมดได้ในไฟล์ CSV</p>
  </section>`;
  return layout({ title: 'ประวัติการใช้งาน — JapexisKey', user, content, noindex: true });
}

export function docsPage({ baseUrl, model, prices, user = null, maxOut = 8192, ratePerMin = 30 }) {
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

  const endpoints = [
    ['POST', '/v1/chat/completions', 'สร้างคำตอบแชท (รองรับการสตรีม)'],
    ['GET', '/v1/models', 'รายการโมเดลที่ให้บริการ'],
    ['GET', '/v1/usage', 'ประวัติการใช้งานของคีย์'],
    ['GET', '/v1/me', 'เครดิตคงเหลือและสรุปการใช้งาน'],
  ];
  const endpointRows = endpoints.map(([m, p, d]) => `<tr><td class="mono">${m}</td><td class="mono">${monoPath(p)}</td><td>${esc(d)}</td></tr>`).join('');
  const endpointItems = endpoints.map(([m, p, d]) => `<div class="data-item"><div class="mono small">${m}</div><div class="mono" style="font-size:12.5px;overflow-wrap:anywhere">${esc(p)}</div><div class="small">${esc(d)}</div></div>`).join('');
  const priceSrc = [
    ['โทเคนขาเข้า (ข้อความที่ส่ง)', prices.in],
    ['โทเคนขาออก (คำตอบ)', prices.out],
    ['โทเคนจากแคช', prices.cacheRead],
  ];
  const priceRows = priceSrc.map(([label, v]) => `<tr><td>${esc(label)}</td><td class="num">฿${thb(v, 2)}</td></tr>`).join('');
  const priceItems = priceSrc.map(([label, v]) => `<div class="data-item"><div class="t">${esc(label)}</div><div class="small">฿${thb(v, 2)} ต่อ 1 ล้านโทเคน</div></div>`).join('');
  const errors = [
    ['400', 'รูปแบบคำขอไม่ถูกต้อง', 'ตรวจ messages และชื่อโมเดล'],
    ['401', 'คีย์ไม่ถูกต้องหรือถูกปิดใช้งาน', 'สร้างคีย์ใหม่ในแดชบอร์ด'],
    ['402', 'เครดิตไม่พอ', 'เติมเครดิตที่หน้า “เติมเครดิต”'],
    ['403', 'บัญชีถูกระงับ', 'ติดต่อฝ่ายบริการลูกค้า'],
    ['404', 'ไม่พบโมเดลหรือที่อยู่ที่เรียก', `ใช้ ${model} เท่านั้น`],
    ['429', 'เรียกใช้งานถี่เกิน 30 คำขอต่อนาที', 'รอสักครู่แล้วลองใหม่'],
    ['500', 'ระบบขัดข้องชั่วคราว', 'ลองใหม่ภายหลัง'],
    ['502/503', 'ระบบภายนอกขัดข้องชั่วคราว', 'ลองใหม่ภายหลัง ไม่มีการหักเครดิต'],
  ];
  const errorRows = errors.map(([c, m, a]) => `<tr><td class="mono">${c}</td><td>${esc(m)}</td><td>${esc(a)}</td></tr>`).join('');
  const errorItems = errors.map(([c, m, a]) => `<div class="data-item"><div class="row"><span class="mono">${c}</span><div class="spacer"></div><span class="t">${esc(m)}</span></div><div class="small">${esc(a)}</div></div>`).join('');

  const content = `
  <section style="padding-top:36px">
    <h1 style="font-size:30px;margin:0">เอกสาร API</h1>
    <p class="sub" style="margin:6px 0 0">ใช้ API มาตรฐานเดียวกับ OpenAI — ใส่ที่อยู่ API นี้ในแอปหรือ SDK ที่รองรับ</p>
    <div class="chips" style="margin:10px 0 0">
      <a class="chip" href="#base">ที่อยู่ API</a>
      <a class="chip" href="#endpoints">Endpoints</a>
      <a class="chip" href="#pricing">ราคา</a>
      <a class="chip" href="#examples">ตัวอย่าง</a>
      <a class="chip" href="#me">ตรวจเครดิต</a>
      <a class="chip" href="#clients">เชื่อมต่อแอป</a>
      <a class="chip" href="#limits">ข้อจำกัด</a>
      <a class="chip" href="#errors">รหัสข้อผิดพลาด</a>
    </div>

    <div class="card" id="base" style="margin-top:18px">
      <div class="row base-row" style="gap:12px;align-items:flex-end">
        <div style="min-width:0;flex:1">
          <div class="small">ที่อยู่ API (Base URL)</div>
          <div class="mono url" style="font-size:14px;margin-top:2px">${esc(baseUrl)}/v1</div>
        </div>
        <button class="btn sm" data-copy="${esc(baseUrl)}/v1">คัดลอก</button>
      </div>
      <hr class="hr">
      <div class="conn-meta">
        <div><div class="small">โมเดล</div><div class="mono">${esc(model)}</div></div>
        <div><div class="small">การยืนยันตัวตน</div><div class="mono">Bearer JXK-…</div></div>
        <div><div class="small">อัตราการเรียก</div><div>30 คำขอ/นาที</div></div>
      </div>
    </div>

    <h2 id="endpoints" style="margin-top:26px">Endpoints</h2>
    <div class="data-list">${endpointItems}</div>
    <div class="tbl-wrap desk-only"><table class="tbl">
      <thead><tr><th>Method</th><th>Path</th><th>คำอธิบาย</th></tr></thead>
      <tbody>${endpointRows}</tbody>
    </table></div>

    <h2 id="clients" style="margin-top:26px">เชื่อมต่อแอปที่ใช้</h2>
    <p class="small">ทุกแอปใช้ที่อยู่ API และคีย์ชุดเดียวกัน · ชื่อเมนูอาจต่างตามเวอร์ชันของแอป</p>
    <div class="list" style="margin-top:10px">
      <div class="item"><div class="l"><div class="t">Cursor</div><div class="m">Settings → Models → เปิด Override OpenAI Base URL → ใส่ ${esc(baseUrl)}/v1 และคีย์ → เพิ่มชื่อโมเดล ${esc(model)}</div></div></div>
      <div class="item"><div class="l"><div class="t">Cline (VS Code)</div><div class="m">API Provider = OpenAI Compatible → Base URL ${esc(baseUrl)}/v1 → API Key → Model ID ${esc(model)} → กด Verify</div></div></div>
      <div class="item"><div class="l"><div class="t">OpenCode</div><div class="m">เพิ่ม provider แบบ openai-compatible ใน opencode.json (baseURL ${esc(baseUrl)}/v1 · เก็บคีย์ใน env var) แล้วตั้งชื่อโมเดล ${esc(model)}</div></div></div>
      <div class="item"><div class="l"><div class="t">n8n</div><div class="m">Credential OpenAI → API Key + Base URL ${esc(baseUrl)}/v1 → เลือกโมเดล ${esc(model)} ใน node</div></div></div>
    </div>
    <h3 style="font-size:15px;color:#5C6775;margin:16px 0 0">ทดสอบการเชื่อมต่อ</h3>
    ${code(`curl ${baseUrl}/v1/models \\
  -H "Authorization: Bearer YOUR-KEY"`)}
    <p class="small">ถ้าตอบเป็นรายการโมเดล = เชื่อมต่อสำเร็จ · 401 = คีย์ไม่ถูกต้อง · 404 = ที่อยู่ API ไม่มี /v1 · <a href="/help">ศูนย์ช่วยเหลือ</a></p>

    <h2 id="limits" style="margin-top:26px">ข้อจำกัดการใช้งาน</h2>
    <div class="list" style="margin-top:10px">
      <div class="item"><div class="l"><div class="t">ความยาวคำตอบ</div><div class="m">ไม่เกิน ${esc(maxOut)} โทเคนต่อคำขอ (max_tokens)</div></div></div>
      <div class="item"><div class="l"><div class="t">อัตราการเรียก</div><div class="m">ไม่เกิน ${esc(ratePerMin)} คำขอต่อนาที ต่อคีย์</div></div></div>
      <div class="item"><div class="l"><div class="t">ขนาดคำขอ</div><div class="m">ไม่เกิน 25 MB ต่อคำขอ</div></div></div>
      <div class="item"><div class="l"><div class="t">การสตรีม</div><div class="m">รองรับ stream · chunk สุดท้ายมีข้อมูล usage สำหรับคิดค่าใช้จ่าย</div></div></div>
      <div class="item"><div class="l"><div class="t">ข้อมูลที่จัดเก็บ</div><div class="m">เก็บเฉพาะจำนวนโทเคน สถานะ และค่าใช้จ่าย — ไม่เก็บข้อความหรือคำตอบ</div></div></div>
    </div>

    <h2 id="pricing" style="margin-top:26px">ราคา</h2>
    <div class="data-list">${priceItems}</div>
    <div class="tbl-wrap desk-only"><table class="tbl">
      <thead><tr><th>ประเภทโทเคน</th><th class="num">ราคา / 1 ล้านโทเคน</th></tr></thead>
      <tbody>${priceRows}</tbody>
    </table></div>

    <h2 id="examples" style="margin-top:26px">ตัวอย่าง</h2>
    <h3 style="font-size:15px;color:#5C6775;margin:14px 0 0">curl</h3>
    ${code(curl)}
    <h3 style="font-size:15px;color:#5C6775;margin:14px 0 0">Python (OpenAI SDK)</h3>
    ${code(py)}
    <h3 style="font-size:15px;color:#5C6775;margin:14px 0 0">Node.js (openai)</h3>
    ${code(node)}
    <h3 style="font-size:15px;color:#5C6775;margin:14px 0 0">Stream</h3>
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

    <h2 id="me" style="margin-top:26px">ตรวจเครดิตคงเหลือ</h2>
    <p class="small">เรียก <span class="mono">GET /v1/me</span> ด้วยคีย์ของคุณ เพื่อดูเครดิตและยอดใช้ 30 วัน — ตัวเลขชุดเดียวกับแดชบอร์ด</p>
    ${code(`{
  "account": "you@example.com",
  "balance_thb": 10,
  "model": "${model}",
  "usage_30d": { "requests": 12, "prompt_tokens": 8400, "completion_tokens": 2100, "cache_read_tokens": 0, "cost_thb": 0.026 },
  "prices_per_1m": { "in": 1.5, "out": 6, "cacheRead": 0.03 }
}`)}

    <h2 id="errors" style="margin-top:26px">รหัสข้อผิดพลาด</h2>
    <div class="data-list">${errorItems}</div>
    <div class="tbl-wrap desk-only"><table class="tbl">
      <thead><tr><th>HTTP</th><th>ความหมาย</th><th>ทำอะไรต่อ</th></tr></thead>
      <tbody>${errorRows}</tbody>
    </table></div>
    <h3 style="font-size:15px;color:#5C6775;margin:16px 0 0">รูปแบบข้อผิดพลาด</h3>
    <p class="small">ทุกข้อผิดพลาดคืน JSON รูปแบบเดียวกัน — ใช้ <span class="mono">error.code</span> ตรวจในโปรแกรม</p>
    ${code(`{
  "error": {
    "message": "เครดิตไม่พอ (คงเหลือ ฿0.00) — เติมได้ที่ ${baseUrl}/buy",
    "type": "insufficient_quota",
    "code": "insufficient_quota"
  }
}`)}

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
      <a class="btn sm ghost" href="/admin/support">ข้อความ</a>
      <a class="btn sm ghost" href="/admin/settings">ตั้งค่า</a>
      <a class="btn sm ghost" href="/admin/usage">Usage</a>
      <form method="post" action="/admin/logout"><button class="btn sm" type="submit">ออก</button></form>
    </div>
    ${flash ? `<div class="flash ok">${esc(flash)}</div>` : ''}
    <div class="kpis" style="margin-top:16px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))">
      <div class="kpi"><div class="k">ผู้ใช้</div><div class="v">${tok(totals.users)}</div><div class="u">บัญชี</div></div>
      <div class="kpi"><div class="k">เครดิตคงเหลือรวม</div><div class="v">฿${thb(totals.balance, 2)}</div><div class="u">หนี้สินที่ยังไม่ถูกใช้</div></div>
      <div class="kpi"><div class="k">รายรับ (approved)</div><div class="v">฿${thb(totals.revenue, 2)}</div><div class="u">ออเดอร์ที่ชำระ</div></div>
      <div class="kpi"><div class="k">Usage 30 วัน</div><div class="v">฿${thb(totals.cost30, 3)}</div><div class="u">ต้นทุนขาย</div></div>
      <div class="kpi"><div class="k">ข้อความรอตอบ</div><div class="v">${tok(totals.open_tickets)}</div><div class="u"><a href="/admin/support">ดูข้อความ</a></div></div>
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
  const rows = users.map((u) => {
    const suspended = u.status !== 'active';
    const statusChip = suspended
      ? `<span class="status s-err">ถูกระงับ</span>${u.status_note ? `<div class="small">${esc(u.status_note)}</div>` : ''}`
      : '<span class="status s-ok">ใช้งานอยู่</span>';
    const toggle = u.role === 'admin'
      ? ''
      : `<form method="post" action="/admin/users/${u.id}/${suspended ? 'unsuspend' : 'suspend'}" style="margin-top:6px" onsubmit="return confirm('${suspended ? 'คืนสิทธิ์ผู้ใช้นี้?' : 'ระงับผู้ใช้นี้? คีย์ทั้งหมดจะตอบ 403'}')"><button class="btn sm ${suspended ? '' : 'danger'}" type="submit">${suspended ? 'คืนสิทธิ์' : 'ระงับ'}</button></form>`;
    return `
      <tr>
        <td>${esc(u.email)}${u.role === 'admin' ? ' <span class="small">(admin)</span>' : ''}</td>
        <td class="num">฿${thb(u.balance_thb, 3)}</td>
        <td>${dt(u.created_at)}</td>
        <td class="num">${tok(u.requests)}</td>
        <td class="num">฿${thb(u.spent, 3)}</td>
        <td>${statusChip}${toggle}</td>
        <td>
          <form method="post" action="/admin/users/${u.id}/credit" style="display:flex;gap:6px;align-items:center">
            <input class="input" name="amount" type="number" step="0.01" min="-10000" max="10000" placeholder="฿" style="width:92px;padding:6px 8px">
            <input class="input" name="note" placeholder="เหตุผล" style="width:130px;padding:6px 8px">
            <button class="btn sm" type="submit">ปรับ</button>
          </form>
        </td>
      </tr>`;
  }).join('');
  const content = `
  <section style="padding-top:36px">
    <div class="row"><h1 style="font-size:26px;margin:0">ผู้ใช้</h1><div class="spacer"></div><a class="btn sm ghost" href="/admin">← กลับ</a></div>
    ${flash ? `<div class="flash ok">${esc(flash)}</div>` : ''}
    <p class="sub" style="margin-top:8px">ปรับเครดิตด้วยมือได้ (บวก = เติม, ลบ = หัก) ทุกครั้งจะลง ledger</p>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>อีเมล</th><th class="num">เครดิต</th><th>สมัคร</th><th class="num">req</th><th class="num">ใช้จ่าย</th><th>สถานะ / การใช้งาน</th><th>ปรับเครดิต</th></tr></thead>
      <tbody>${rows || '<tr><td colspan="7" class="small">ยังไม่มีผู้ใช้</td></tr>'}</tbody>
    </table></div>
  </section>`;
  return layout({ title: 'ผู้ใช้ — JapexisKey', content, user, noindex: true });
}

export function adminSupport({ rows, flash, user = null }) {
  const topics = { api: 'การใช้งาน API', billing: 'เครดิต/ชำระเงิน', key: 'คีย์ API', other: 'อื่น ๆ' };
  const trs = rows.map((s) => {
    const open = s.status !== 'closed';
    const subj = encodeURIComponent(`[#${s.id} · ${topics[s.topic] || s.topic}] JapexisKey — ตอบกลับ`);
    return `
      <tr>
        <td>${dt(s.created_at)}</td>
        <td>${esc(s.email)} ${s.user_id ? '<span class="status s-ok">บัญชี</span>' : '<span class="status s-warn">ภายนอก</span>'}${s.user_status && s.user_status !== 'active' ? ' <span class="small">(ระงับ)</span>' : ''}</td>
        <td>${esc(topics[s.topic] || s.topic)}</td>
        <td style="max-width:420px">
          <div style="white-space:pre-wrap">${esc(s.message)}</div>
          ${s.reply_text ? `<div class="small" style="margin-top:8px;white-space:pre-wrap;background:#F8FAFC;border-left:3px solid #2563EB;padding:6px 8px">ตอบกลับ: ${esc(s.reply_text)}</div>` : ''}
          <form method="post" action="/admin/support/${s.id}/reply" style="margin-top:8px">
            <textarea class="input" name="reply" rows="2" maxlength="2000" style="width:100%;min-width:220px" placeholder="พิมพ์คำตอบถึงลูกค้า...">${esc(s.reply_text || '')}</textarea>
            <label class="small" style="display:flex;gap:6px;align-items:center;margin-top:4px"><input type="checkbox" name="close" value="1"> ปิดข้อความหลังตอบ</label>
            <button class="btn sm primary" type="submit" style="margin-top:6px">บันทึกคำตอบ</button>
          </form>
        </td>
        <td>${open ? (s.reply_text ? '<span class="status s-ok">ตอบแล้ว</span>' : '<span class="status s-warn">รอตอบ</span>') : '<span class="status s-ok">ปิดแล้ว</span>'}</td>
        <td class="nowrap">
          <a class="btn sm" href="mailto:${esc(encodeURIComponent(s.email))}?subject=${esc(subj)}">ตอบอีเมล</a>
          <button class="btn sm" data-copy="${esc(s.message)}">คัดลอก</button>
          ${open
            ? `<form method="post" action="/admin/support/${s.id}/close" style="display:inline"><button class="btn sm" type="submit">ปิด</button></form>`
            : `<form method="post" action="/admin/support/${s.id}/reopen" style="display:inline"><button class="btn sm" type="submit">เปิด</button></form>`}
        </td>
      </tr>`;
  }).join('') || '<tr><td colspan="6" class="small">ยังไม่มีข้อความ</td></tr>';
  const content = `
  <section style="padding-top:36px">
    <div class="row"><h1 style="font-size:26px;margin:0">ข้อความช่วยเหลือ</h1><div class="spacer"></div><a class="btn sm ghost" href="/admin">← กลับ</a></div>
    ${flash ? `<div class="flash ok">${esc(flash)}</div>` : ''}
    <p class="sub" style="margin-top:8px">ข้อความจากลูกค้าผ่านหน้า /help — ตอบกลับทางอีเมลที่แสดง</p>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>เวลา</th><th>อีเมล</th><th>หัวข้อ</th><th>ข้อความ</th><th>สถานะ</th><th></th></tr></thead>
      <tbody>${trs}</tbody>
    </table></div>
  </section>`;
  return layout({ title: 'ข้อความช่วยเหลือ — JapexisKey', content, user, noindex: true });
}

export function adminSettings({ settings, flash, user = null, model = '', promptpayValid = false, qrPreview = null }) {
  const f = (key, label, hint = '', type = 'text', step = '') => `
      <label class="lbl" for="${key}">${label}</label>
      <input class="input" id="${key}" name="${key}" type="${type}" ${step ? `step="${step}"` : ''} value="${esc(settings[key] ?? '')}">
      ${hint ? `<div class="small" style="margin-top:4px">${hint}</div>` : ''}`;
  const content = `
  <section style="padding-top:36px">
    <div class="row"><h1 style="font-size:26px;margin:0">ตั้งค่า</h1><div class="spacer"></div><a class="btn sm ghost" href="/admin">← กลับ</a></div>
    ${flash ? `<div class="flash ok">${esc(flash)}</div>` : ''}
    ${promptpayValid
      ? '<div class="flash ok">พร้อมรับชำระเงิน — เลขพร้อมเพย์ถูกต้อง</div>'
      : settings.promptpay_id
        ? '<div class="warnbox" style="margin-bottom:14px"><b>เลขพร้อมเพย์ไม่ถูกต้อง</b><div class="small" style="margin-top:4px">ระบบปิดรับชำระเงินจนกว่าจะแก้เลขให้ถูกต้อง (ต้องเป็นเบอร์ 10 หลักขึ้นต้น 0 หรือเลข 13 หลัก)</div></div>'
        : '<div class="warnbox" style="margin-bottom:14px"><b>ยังไม่ตั้งเลขพร้อมเพย์</b><div class="small" style="margin-top:4px">ระบบปิดรับชำระเงินอยู่ — ตั้งเลขแล้ว QR จะขึ้นที่หน้าคำสั่งซื้อ</div></div>'}
    ${qrPreview ? `<div class="card" style="max-width:340px;margin-bottom:14px"><div class="small">ตัวอย่าง QR ฿10.00 — สแกนทดสอบก่อนเปิดขาย</div><div style="margin-top:8px">${qrPreview}</div></div>` : ''}
    <form method="post" action="/admin/settings" class="form" style="max-width:560px;margin-top:14px">
      <h2 style="font-size:17px">รับเงิน</h2>
      ${f('promptpay_id', 'เลขพร้อมเพย์', 'เบอร์มือถือ 10 หลักที่ขึ้นต้นด้วย 0 หรือเลข 13 หลัก — ถ้าเลขผิด ระบบจะไม่บันทึกและปิดรับชำระเงิน', 'text')}
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

export function creditPage({ user, entries, daily, totals, pending, flash }) {
  const bal = Number(user.balance_thb || 0);
  const added = Number((totals && totals.added) || 0);
  const spent = Number((totals && totals.spent) || 0);
  const label = (reason) => {
    const r = String(reason || '');
    if (r === 'welcome') return 'เครดิตทดลองสำหรับบัญชีใหม่';
    if (r === 'usage') return 'หักตามการใช้งาน';
    if (r.startsWith('topup:')) return 'เติมเครดิตแผน ' + r.slice(6).toUpperCase();
    return r ? `ปรับโดยเจ้าหน้าที่ · ${r}` : 'ปรับเครดิต';
  };
  const amount = (n) => {
    const v = Number(n || 0);
    if (v === 0) return '฿0.00';
    return (v > 0 ? '+' : '−') + '฿' + thb(Math.abs(v), Math.abs(v) >= 1 ? 2 : 4);
  };
  const entryRows = entries.map((e) => `
      <div class="item">
        <div class="l"><div class="t">${esc(label(e.reason))}${e.ref ? ` · <span class="mono">${esc(e.ref)}</span>` : ''}</div><div class="m">${dt(e.created_at)}</div></div>
        <div class="mono ${Number(e.delta_thb) > 0 ? 'amt-pos' : 'amt-neg'}">${amount(e.delta_thb)}</div>
      </div>`).join('') || '<div class="small" style="padding:10px 0">ยังไม่มีรายการเงินเข้า</div>';
  const dailyRows = daily.map((d) => `
      <div class="item">
        <div class="l"><div class="t">${dOnly(d.day)}</div><div class="m">${tok(d.requests)} คำขอ</div></div>
        <div class="mono">${money(d.cost_thb)}</div>
      </div>`).join('') || '<div class="small" style="padding:10px 0">ยังไม่มีการใช้งาน</div>';
  const pendingRows = pending.map((o) => `
      <div class="item">
        <div class="l"><div class="t">${esc(o.ref)} · แผน ${esc(o.plan_code)}</div><div class="m">จ่าย ฿${thb(o.amount_thb, 0)} → เครดิต ฿${thb(o.credit_thb, 0)} · ${dt(o.created_at)}</div></div>
        <div><span class="status s-warn">${o.status === 'review' ? 'รอตรวจสอบ' : 'รอชำระ'}</span> <a class="btn sm" href="/order/${esc(o.ref)}">ดูรายละเอียด</a></div>
      </div>`).join('');

  const content = `
  <section style="padding-top:36px">
    <div class="row">
      <div><h1 style="font-size:26px;margin:0">ประวัติเครดิต</h1><p class="sub" style="margin:4px 0 0">ยอดคงเหลือคือยอดจริงในระบบ ส่วนรายการด้านล่างใช้ตรวจที่มาของเครดิต</p></div>
      <div class="spacer"></div>
      <a class="btn sm" href="/app/credit.csv">ดาวน์โหลด CSV</a>
      <a class="btn sm" href="/app">กลับแดชบอร์ด</a>
    </div>
    ${flash ? `<div class="flash ok">${esc(flash)}</div>` : ''}
    <div class="kpis" style="margin-top:14px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))">
      <div class="kpi"><div class="k">เครดิตคงเหลือ</div><div class="v">฿${thb(bal, 2)}</div><div class="u">ยอดจริงในบัญชี</div></div>
      <div class="kpi"><div class="k">เข้า 30 วัน</div><div class="v">+฿${thb(added, 2)}</div><div class="u">เติม/ทดลอง/ปรับ</div></div>
      <div class="kpi"><div class="k">หัก 30 วัน</div><div class="v">฿${thb(spent, 2)}</div><div class="u">รวมการใช้ API</div></div>
    </div>

    <div class="card" style="margin-top:16px">
      <h2 style="font-size:17px;margin:0">เงินเข้าและปรับเครดิต</h2>
      <p class="small" style="margin:6px 0 0">รายการหักทีละคำขออยู่ในประวัติการใช้งาน</p>
      <div class="list" style="margin-top:12px">${entryRows}</div>
    </div>

    ${pendingRows ? `<div class="card" style="margin-top:16px">
      <h2 style="font-size:17px;margin:0">รอตรวจสอบการชำระเงิน</h2>
      <p class="small" style="margin:6px 0 0">รายการเหล่านี้ยังไม่เพิ่มเครดิตเข้าบัญชี</p>
      <div class="list" style="margin-top:12px">${pendingRows}</div>
    </div>` : ''}

    <div class="card" style="margin-top:16px">
      <h2 style="font-size:17px;margin:0">หักตามการใช้รายวัน</h2>
      <p class="small" style="margin:6px 0 0">ยอดรวมต่อวันจากบันทึกการใช้ (เฉพาะวันที่มีการเรียก API)</p>
      <div class="list" style="margin-top:12px">${dailyRows}</div>
    </div>

    <div class="warnbox small" style="margin-top:16px;line-height:1.7">
      ยอดรวมในบันทึกอาจต่างจากยอดคงเหลือเล็กน้อย เมื่อระบบหักค่าใช้จ่ายจนเครดิตหมดพอดี · คำขอที่ค่าใช้จ่ายต่ำกว่า ฿0.0001 จะยังแสดงในประวัติการใช้งานแต่ไม่เกิดรายการหักในบันทึกนี้
    </div>
  </section>`;
  return layout({ title: 'ประวัติเครดิต — JapexisKey', user, content, noindex: true });
}

export function helpPage({ user = null, payReady = true, model = 'deepseek-v4.1-flash', baseUrl = '', flash = '', messages = [] }) {
  const topics = { api: 'การใช้งาน API', billing: 'เครดิต/ชำระเงิน', key: 'คีย์ API', other: 'อื่น ๆ' };
  const short = (t) => { const s = String(t || ''); return s.length > 160 ? s.slice(0, 160) + '…' : s; };
  const openCount = messages.filter((m) => m.status !== 'closed' && !m.reply_text).length;
  const content = `
  <section style="padding-top:36px">
    <h1 style="font-size:26px;margin:0">ศูนย์ช่วยเหลือ</h1>
    <p class="sub" style="margin:4px 0 0">คำตอบเร็ว ๆ และทางไปต่อสำหรับปัญหาที่พบบ่อย</p>
    ${flash ? `<div class="flash ok">${esc(flash)}</div>` : ''}
    <div class="two" style="margin-top:14px">
      <div class="card">
        <h2 style="font-size:17px;margin:0">เริ่มใช้งาน</h2>
        <div class="list" style="margin-top:10px">
          <div class="item"><div class="l"><div class="t">1. เข้าสู่ระบบด้วย Google</div><div class="m">บัญชีใหม่ได้รับเครดิตทดลอง ฿10</div></div><a class="btn sm" href="/login">เข้าสู่ระบบ</a></div>
          <div class="item"><div class="l"><div class="t">2. คัดลอกคีย์และที่อยู่ API</div><div class="m">ที่อยู่ API <span class="mono">${esc(baseUrl)}/v1</span></div></div><a class="btn sm" href="/app">แดชบอร์ด</a></div>
          <div class="item"><div class="l"><div class="t">3. เชื่อมต่อแอปที่ใช้</div><div class="m">ตั้ง Base URL และคีย์ตามตัวอย่าง</div></div><a class="btn sm" href="/docs#clients">วิธีเชื่อมต่อ</a></div>
        </div>
      </div>
      <div class="card">
        <h2 style="font-size:17px;margin:0">เครดิตและยอดคงเหลือ</h2>
        <div class="list" style="margin-top:10px">
          <div class="item"><div class="l"><div class="t">ดูยอดคงเหลือ</div><div class="m">หน้าแดชบอร์ด หรือเรียก <span class="mono">GET /v1/me</span> ด้วยคีย์ของคุณ</div></div><a class="btn sm" href="/app">ดูยอด</a></div>
          <div class="item"><div class="l"><div class="t">เติมเครดิต</div><div class="m">${payReady ? 'ชำระผ่าน PromptPay แล้วแจ้งเลขอ้างอิงสลิป' : 'ขณะนี้ยังไม่เปิดรับชำระเงินออนไลน์'}</div></div><a class="btn sm" href="/pricing">ราคา</a></div>
          <div class="item"><div class="l"><div class="t">ประวัติการใช้งานและเงินเข้า</div><div class="m">ดูรายคำขอหรือดาวน์โหลด CSV</div></div><a class="btn sm" href="/app/usage">ประวัติ</a></div>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:16px">
      <h2 style="font-size:17px;margin:0">คีย์ API</h2>
      <div class="list" style="margin-top:10px">
        <div class="item"><div class="l"><div class="t">คีย์หายหรือไม่ได้เก็บไว้</div><div class="m">คีย์แสดงเต็มเพียงครั้งเดียวเมื่อสร้าง — สร้างคีย์ใหม่ได้ในแดชบอร์ด แล้วปิดใช้งานคีย์เดิม</div></div><a class="btn sm" href="/app">จัดการคีย์</a></div>
        <div class="item"><div class="l"><div class="t">คีย์ถูกปิดใช้งาน</div><div class="m">แอปที่ใช้คีย์เดิมจะใช้งานไม่ได้ทันที — สร้างคีย์ใหม่แล้วเปลี่ยนในแอป</div></div></div>
      </div>
    </div>

    <div class="card" style="margin-top:16px">
      <h2 style="font-size:17px;margin:0">ข้อผิดพลาดที่พบบ่อย</h2>
      <div class="list" style="margin-top:10px">
        <div class="item"><div class="l"><div class="t">401 คีย์ไม่ถูกต้อง</div><div class="m">ตรวจว่าส่ง <span class="mono">Authorization: Bearer &lt;คีย์&gt;</span> และคีย์ยังใช้งานอยู่</div></div></div>
        <div class="item"><div class="l"><div class="t">402 เครดิตไม่พอ</div><div class="m">เติมเครดิตที่หน้า “ราคา” — ข้อความจะบอกยอดคงเหลือ</div></div></div>
        <div class="item"><div class="l"><div class="t">429 เรียกถี่เกิน</div><div class="m">สูงสุด 30 คำขอต่อนาทีต่อคีย์ — รอแล้วลองใหม่</div></div></div>
        <div class="item"><div class="l"><div class="t">502/503 ระบบขัดข้องชั่วคราว</div><div class="m">ลองใหม่ภายหลัง · คำขอที่ล้มเหลวไม่ถูกหักเครดิต</div></div><a class="btn sm" href="/status">สถานะระบบ</a></div>
      </div>
      <p class="small" style="margin:10px 0 0">รายละเอียดทั้งหมด: <a href="/docs#errors">รหัสข้อผิดพลาดในเอกสาร API</a></p>
    </div>

    <div class="card" style="margin-top:16px">
      <h2 style="font-size:17px;margin:0">ติดต่อฝ่ายบริการลูกค้า</h2>
      <p class="small" style="margin:6px 0 0">หากไม่พบคำตอบ กรุณาส่งข้อความพร้อมรายละเอียดและเลขอ้างอิงคำขอ (ถ้ามี) — เจ้าหน้าที่จะตอบกลับทางอีเมล</p>
      ${user && messages.length ? `<p class="small" style="margin:8px 0 0">${openCount > 0 ? `มี ${openCount} ข้อความรอตอบ` : 'ข้อความล่าสุดปิดแล้ว'} · ดูรายการด้านล่าง</p>` : ''}
      ${user ? `<form method="post" action="/help/message" style="margin-top:12px">
        <label class="lbl" for="topic">หัวข้อ</label>
        <select class="input" id="topic" name="topic">
          <option value="api">การใช้งาน API</option>
          <option value="billing">เครดิตและการชำระเงิน</option>
          <option value="key">คีย์ API</option>
          <option value="other">อื่น ๆ</option>
        </select>
        <label class="lbl" for="message" style="margin-top:10px">รายละเอียด</label>
        <textarea class="input" id="message" name="message" rows="4" maxlength="2000" placeholder="อธิบายปัญหา ข้อความแสดงข้อผิดพลาด และเวลาที่เกิด (ถ้ามี)"></textarea>
        <input type="text" name="website" value="" autocomplete="off" tabindex="-1" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">
        <button class="btn primary" type="submit" style="margin-top:10px;width:100%">ส่งข้อความ</button>
        <p class="small" style="margin-top:6px">ตอบกลับทางอีเมล ${esc(user.email || '')} · ส่งได้ไม่เกิน 3 ข้อความต่อชั่วโมง</p>
      </form>` : `<form method="post" action="/help/message" style="margin-top:12px">
        <label class="lbl" for="guest-email">อีเมลสำหรับติดต่อกลับ</label>
        <input class="input" id="guest-email" name="email" type="email" required maxlength="254" autocomplete="email" inputmode="email" placeholder="you@example.com">
        <label class="lbl" for="guest-topic" style="margin-top:10px">หัวข้อ</label>
        <select class="input" id="guest-topic" name="topic">
          <option value="api">การใช้งาน API</option>
          <option value="billing">เครดิตและการชำระเงิน</option>
          <option value="key">คีย์ API</option>
          <option value="other">อื่น ๆ</option>
        </select>
        <label class="lbl" for="guest-message" style="margin-top:10px">รายละเอียด</label>
        <textarea class="input" id="guest-message" name="message" rows="4" maxlength="2000" placeholder="อธิบายปัญหา ข้อความแสดงข้อผิดพลาด และเวลาที่เกิด (ถ้ามี)"></textarea>
        <input type="text" name="website" value="" autocomplete="off" tabindex="-1" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">
        <button class="btn primary" type="submit" style="margin-top:10px;width:100%">ส่งข้อความ</button>
        <p class="small" style="margin-top:6px">ตอบกลับทางอีเมลที่ให้ไว้ · สูงสุด 2 ข้อความ/ชั่วโมง · <a href="/login">มีบัญชีแล้ว? เข้าสู่ระบบ</a></p>
      </form>`}
      ${messages.length ? `<hr class="hr" style="margin:14px 0">
        <div class="small" style="margin-bottom:6px">ข้อความที่คุณส่งล่าสุด</div>
        <div class="list">${messages.map((m) => `
          <div class="item">
            <div class="l"><div class="t">${esc(topics[m.topic] || m.topic)} · ${dt(m.created_at)}</div><div class="m">${esc(short(m.message))}</div>${m.reply_text ? `<div class="small" style="margin-top:6px;white-space:pre-wrap;background:#F8FAFC;border-left:3px solid #2563EB;padding:6px 8px">ตอบกลับ: ${esc(short(m.reply_text))}</div>` : ''}</div>
            <div>${m.status === 'closed' ? '<span class="status s-ok">ปิดแล้ว</span>' : m.reply_text ? '<span class="status s-ok">ตอบแล้ว</span>' : '<span class="status s-warn">รอตอบ</span>'}</div>
          </div>`).join('')}</div>` : ''}
      <p class="small" style="margin-top:10px">ดู <a href="/status">สถานะระบบ</a> และ <a href="/privacy">ความเป็นส่วนตัว</a></p>
    </div>
  </section>`;
  return layout({ title: 'ศูนย์ช่วยเหลือ — JapexisKey', content, user });
}

export function privacyPage({ user = null }) {
  const content = `
  <section style="padding-top:36px">
    <h1 style="font-size:26px;margin:0">ความเป็นส่วนตัว</h1>
    <p class="sub" style="margin:4px 0 0">สรุปข้อมูลที่ระบบจัดเก็บ วิธีใช้ และสิทธิ์ของคุณ · อัปเดต 13 พฤศจิกายน 2026</p>

    <div class="card" style="margin-top:14px">
      <h2 style="font-size:17px;margin:0">ข้อมูลที่จัดเก็บ</h2>
      <div class="list" style="margin-top:10px">
        <div class="item"><div class="l"><div class="t">บัญชี</div><div class="m">อีเมลและชื่อจากบัญชี Google · รหัสผู้ใช้ Google · สถานะบัญชี</div></div></div>
        <div class="item"><div class="l"><div class="t">คีย์ API</div><div class="m">เก็บเป็นค่าแฮช SHA-256 พร้อมชื่อ คำนำหน้า และเวลาใช้งานล่าสุด — ไม่เก็บคีย์ตัวจริง</div></div></div>
        <div class="item"><div class="l"><div class="t">การใช้งาน</div><div class="m">เวลา โมเดล จำนวนโทเคน (ขาเข้า ขาออก จากแคช) สถานะ ค่าใช้จ่าย เวลาตอบ และ IP ของผู้เรียก</div></div></div>
        <div class="item"><div class="l"><div class="t">การเงิน</div><div class="m">คำสั่งซื้อ แผน ยอดเงิน เครดิต และบันทึกการเติม ปรับ หรือหักเครดิต</div></div></div>
        <div class="item"><div class="l"><div class="t">ข้อความที่คุณกรอกเอง</div><div class="m">หมายเหตุในคำสั่งซื้อ (เช่น เลขอ้างอิงสลิป) และเหตุผลการปรับเครดิตโดยเจ้าหน้าที่</div></div></div>
      </div>
    </div>

    <div class="card" style="margin-top:16px">
      <h2 style="font-size:17px;margin:0">ข้อมูลที่ไม่จัดเก็บ</h2>
      <p class="small" style="margin:6px 0 0">ระบบไม่จัดเก็บเนื้อหาข้อความที่คุณส่งหรือคำตอบของโมเดล — เก็บเฉพาะจำนวนโทเคนและสถานะเพื่อคิดค่าใช้จ่ายและแสดงประวัติ</p>
    </div>

    <div class="card" style="margin-top:16px">
      <h2 style="font-size:17px;margin:0">การส่งข้อมูลให้บริการอื่น</h2>
      <div class="list" style="margin-top:10px">
        <div class="item"><div class="l"><div class="t">ผู้ให้บริการโมเดล</div><div class="m">ข้อความและพารามิเตอร์ของคำขอถูกส่งไปประมวลผลที่ผู้ให้บริการโมเดล ตามนโยบายของผู้ให้บริการนั้น</div></div></div>
        <div class="item"><div class="l"><div class="t">Google</div><div class="m">ใช้ยืนยันตัวตนและรับอีเมลกับชื่อ — ไม่ได้ขอสิทธิ์อื่น</div></div></div>
        <div class="item"><div class="l"><div class="t">โครงข่ายเว็บไซต์</div><div class="m">เว็บไซต์ให้บริการผ่าน Cloudflare ซึ่งอาจบันทึกข้อมูลการเข้าชมตามนโยบายของ Cloudflare</div></div></div>
      </div>
    </div>

    <div class="card" style="margin-top:16px">
      <h2 style="font-size:17px;margin:0">คุกกี้</h2>
      <p class="small" style="margin:6px 0 0">ใช้คุกกี้ที่จำเป็นต่อการทำงาน ได้แก่ การเข้าสู่ระบบ (7 วัน) การป้องกันการปลอมคำขอตอนเข้าสู่ระบบ การแสดงคีย์ใหม่เพียงครั้งเดียว (5 นาที) และข้อความแจ้งเตือนชั่วคราว — ไม่มีคุกกี้โฆษณา</p>
    </div>

    <div class="card" style="margin-top:16px">
      <h2 style="font-size:17px;margin:0">ระยะเวลาเก็บและสิทธิ์ของคุณ</h2>
      <p class="small" style="margin:6px 0 0">ระบบยังไม่มีรอบลบข้อมูลอัตโนมัติ — ข้อมูลการใช้งานถูกเก็บไว้เพื่อประวัติและตรวจสอบค่าใช้จ่าย หากต้องการตรวจสอบ แก้ไข หรือขอลบข้อมูล กรุณา<a href="/help">ติดต่อฝ่ายบริการลูกค้า</a>พร้อมรายละเอียดบัญชี</p>
    </div>

    <p class="small" style="margin-top:14px"><a href="/docs">เอกสาร API</a> · <a href="/status">สถานะระบบ</a> · <a href="/pricing">ราคา</a></p>
  </section>`;
  return layout({ title: 'ความเป็นส่วนตัว — JapexisKey', content, user });
}

export function statusPage({ dbOk, dbMs, model, prices, payReady, baseUrl, upstream, uptime = 0, user = null }) {
  const checked = dt(new Date());
  const up = Math.max(0, Math.round(Number(uptime) || 0));
  const upText = up >= 86400
    ? `${Math.floor(up / 86400)} วัน ${Math.floor((up % 86400) / 3600)} ชม.`
    : up >= 3600
      ? `${Math.floor(up / 3600)} ชม. ${Math.floor((up % 3600) / 60)} น.`
      : `${Math.floor(up / 60)} น.`;
  const content = `
  <section style="padding-top:36px">
    <div class="row">
      <div><h1 style="font-size:26px;margin:0">สถานะระบบ</h1><p class="sub" style="margin:4px 0 0">ตรวจสอบสดทุกครั้งที่โหลดหน้า · ล่าสุด ${checked}</p></div>
      <div class="spacer"></div>
      <a class="btn sm" href="/health">ผลตรวจ JSON</a>
    </div>
    <div class="kpis" style="margin-top:14px;grid-template-columns:repeat(auto-fit,minmax(160px,1fr))">
      <div class="kpi"><div class="k">ฐานข้อมูล</div><div class="v">${dbOk ? 'ทำงานปกติ' : 'ขัดข้อง'}</div><div class="u">ตอบใน ${dbMs} ms</div></div>
      <div class="kpi"><div class="k">โมเดลที่ให้บริการ</div><div class="v" style="font-size:16px">${upstream ? 'DeepSeek V4.1 Flash' : 'ยังไม่พร้อม'}</div><div class="u mono">${esc(model)}</div></div>
      <div class="kpi"><div class="k">ราคาต่อ 1 ล้านโทเคน</div><div class="v" style="font-size:15px">฿${thb(prices.in, 2)} / ฿${thb(prices.out, 2)}</div><div class="u">ขาเข้า / ขาออก · จากแคช ฿${thb(prices.cacheRead, 2)}</div></div>
      <div class="kpi"><div class="k">อัปไทม์</div><div class="v" style="font-size:16px">${upText}</div><div class="u">ตั้งแต่ deploy ล่าสุด</div></div>
    </div>
    <div class="card" style="margin-top:16px">
      <h2 style="font-size:17px;margin:0">รายละเอียด</h2>
      <div class="list" style="margin-top:10px">
        <div class="item"><div class="l"><div class="t">การเชื่อมต่อฐานข้อมูล</div><div class="m">ตรวจด้วยคำสั่ง SELECT 1 ทุกครั้งที่โหลดหน้านี้</div></div><div>${dbOk ? '<span class="status s-ok">ปกติ</span>' : '<span class="status s-err">ขัดข้อง</span>'}</div></div>
        <div class="item"><div class="l"><div class="t">บริการโมเดล</div><div class="m">ที่อยู่ API <span class="mono">${esc(baseUrl)}/v1</span> · โมเดล <span class="mono">${esc(model)}</span></div></div><div>${upstream ? '<span class="status s-ok">ตั้งค่าแล้ว</span>' : '<span class="status s-warn">ยังไม่พร้อม</span>'}</div></div>
        <div class="item"><div class="l"><div class="t">การรับชำระเงิน</div><div class="m">ชำระผ่าน PromptPay และให้เจ้าหน้าที่ตรวจสอบก่อนเติมเครดิต</div></div><div>${payReady ? '<span class="status s-ok">เปิดรับ</span>' : '<span class="status s-warn">ยังไม่เปิด</span>'}</div></div>
      </div>
    </div>
    ${dbOk ? '' : '<div class="warnbox" style="margin-top:16px">ขณะนี้ระบบบางส่วนขัดข้อง คำขอที่ล้มเหลวจะไม่ถูกหักเครดิต กรุณาลองใหม่ภายหลัง</div>'}
    <p class="small" style="margin-top:14px">หน้านี้แสดงเฉพาะสถานะที่ตรวจได้จากระบบ · หากพบปัญหาที่ไม่แสดงที่นี่ กรุณาติดต่อฝ่ายบริการลูกค้าพร้อมเลขอ้างอิงคำขอ (ถ้ามี) · <a href="/docs">เอกสาร API</a> · <a href="/pricing">ราคา</a> · <a href="/help">ศูนย์ช่วยเหลือ</a></p>
  </section>`;
  return layout({ title: 'สถานะระบบ — JapexisKey', content, user });
}

export function errorPage({ title = 'เกิดข้อผิดพลาด', message = '', code = 500, user = null }) {
  const content = `
  <section style="padding:60px 0">
    <h1 style="font-size:26px">${esc(title)}</h1>
    <p class="sub">${esc(message)}</p>
    <div class="row" style="gap:8px;flex-wrap:wrap">
      <a class="btn" href="/">กลับหน้าแรก</a>
      <a class="btn" href="/pricing">ดูราคา</a>
      <a class="btn" href="/status">สถานะระบบ</a>
      <a class="btn" href="/help">ช่วยเหลือ</a>
      <a class="btn" href="/docs">เอกสาร API</a>
    </div>
  </section>`;
  return layout({ title: `${title} — JapexisKey`, content, user, noindex: true });
}
