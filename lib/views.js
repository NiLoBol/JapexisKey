// Server-rendered HTML (no framework, no build step)
const CSS = `:root{--bg:#F2F3F5;--panel:#FFFFFF;--soft:#EDF1F5;--ink:#14181D;--ink2:#3C444C;--muted:#565E66;--line:#D8DCE0;--line2:#BEC4CA;--accent:#14487F;--accent2:#0E345E;--ok:#156B45;--warn:#8A5B00;--err:#A32017;--r:5px;--sans:"IBM Plex Sans Thai","Noto Sans Thai","Sarabun",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;--mono:ui-monospace,"SF Mono",Menlo,"Cascadia Mono",Consolas,monospace}
*{box-sizing:border-box}
html{color-scheme:light;-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);font-size:16px;line-height:1.65;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
img,svg{max-width:100%}
.wrap{max-width:1080px;margin:0 auto;padding:0 16px}
h1,h2,h3,h4{font-weight:600;margin:0}
h1{font-size:27px;line-height:1.34;margin:10px 0}
h2{font-size:20px;line-height:1.4}
h3{font-size:15.5px;line-height:1.5}
.sub{font-size:14px;color:var(--muted);margin:2px 0 14px;line-height:1.6}
.num,.mono,.mono-path,code,pre{font-family:var(--mono);font-variant-numeric:tabular-nums;font-feature-settings:"tnum" 1}
.mono{overflow-wrap:anywhere}
.small{font-size:13.5px;color:var(--muted);line-height:1.62}
.muted{color:var(--muted)}
hr,.hr{height:1px;background:var(--line);border:0;margin:16px 0}
.nowrap{white-space:nowrap}
.row{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.spacer{margin-left:auto}
.two{display:grid;gap:1px;background:var(--line);border:1px solid var(--line)}
@media(min-width:820px){.two{grid-template-columns:1.15fr .85fr}.two>*{background:var(--panel);padding:14px}}
@media(max-width:819px){.two>*{background:var(--panel)}}
/* buttons + links */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:0 16px;border:1px solid var(--line2);border-radius:var(--r);background:var(--panel);color:var(--ink);font-family:var(--sans);font-size:15px;font-weight:500;cursor:pointer;transition:background .12s,border-color .12s,color .12s;text-align:center}
.btn:hover{background:#F7F8F9;border-color:var(--ink2)}
.btn.primary{background:var(--accent);border-color:var(--accent);color:#fff}
.btn.primary:hover{background:var(--accent2);border-color:var(--accent2)}
.btn.ghost{background:transparent;border-color:transparent;color:var(--accent);box-shadow:none}
.btn.ghost:hover{background:transparent;border-bottom-color:var(--accent);border-color:transparent}
.btn.danger{border-color:#E0C3BF;background:#FDF3F2;color:var(--err)}
.btn.danger:hover{background:#FBE8E6;border-color:var(--err)}
.btn.big{min-height:50px;font-size:16px}
.btn.sm{min-height:44px;padding:0 13px;font-size:13.5px}
.btn:disabled{opacity:.55;cursor:not-allowed}
#frm,.form{display:grid;gap:2px;max-width:440px}
:focus-visible,summary:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.link{display:inline-flex;align-items:center;min-height:44px;font-size:14.5px;color:var(--accent);white-space:nowrap}
/* header */
header.site{background:var(--bg);border-bottom:1px solid var(--line)}
.nav{display:flex;align-items:center;gap:12px;min-height:60px;flex-wrap:wrap}
.brand{display:flex;align-items:center;gap:7px;font-weight:600;font-size:17.5px;min-height:44px}
.brand .tid{font-family:var(--mono);font-size:10.5px;color:var(--muted);letter-spacing:.03em}
.logo{width:24px;height:24px;border-radius:4px;background:var(--accent);color:#fff;display:inline-grid;place-items:center;font-family:var(--mono);font-size:13px;font-weight:600;flex:none;align-self:center}
.nav-links{display:none;gap:4px;font-size:14.5px;color:var(--ink2)}
.nav-links a{display:inline-flex;align-items:center;min-height:44px;padding:0 10px;border-bottom:1px solid transparent}
.nav-links a:hover{border-bottom-color:var(--line2)}
.nav-links a.on{color:var(--ink);font-weight:600;border-bottom-color:var(--accent)}
@media(min-width:760px){.nav-links{display:flex}}
.right{margin-left:auto;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.balance-pill{font-family:var(--mono);font-size:13px;border:1px solid var(--line);background:var(--panel);padding:0 11px;min-height:44px;display:inline-flex;align-items:center;border-radius:var(--r);color:var(--accent2);white-space:nowrap}
@media(max-width:759px){
  .nav{min-height:0;padding:10px 0;row-gap:8px}
  .nav-links{display:flex;flex-basis:100%;order:3;margin-left:-2px}
  .nav-links a{flex:1 1 0;min-width:0;justify-content:center;border:1px solid var(--line);border-radius:var(--r);background:var(--panel);color:var(--ink);padding:0 4px;font-size:13px;line-height:1.35;text-align:center;white-space:nowrap}
  .nav-links a.on{border-color:var(--ink)}
  header.site{position:static}
  .brand .tid{display:none}
}
/* sections */
section{padding:26px 0 4px}
/* hero */
.hero{padding:26px 0 6px}
.eyebrow,.pill{display:flex;align-items:center;gap:8px;font-family:var(--mono);font-size:11.5px;color:var(--muted);letter-spacing:.02em;margin:0 0 4px}
.eyebrow i,.dot{width:6px;height:6px;border-radius:50%;background:var(--ok);flex:none;display:inline-block}
.pill{border:1px solid var(--line);background:var(--panel);border-radius:var(--r);padding:6px 10px;margin-bottom:10px;font-family:var(--sans);font-size:13px;color:var(--ink2);letter-spacing:0}
.pill .dot{margin-right:0}
h1 em{font-style:normal;font-family:var(--mono);font-variant-numeric:tabular-nums;white-space:nowrap}
.lead{font-size:16px;line-height:1.68;color:var(--ink2);margin:0 0 18px;max-width:640px}
.cta{display:grid;gap:8px;margin-bottom:14px}
.cta .btn{width:100%}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.chip{display:inline-flex;align-items:center;min-height:36px;border:1px solid var(--line);background:var(--panel);border-radius:var(--r);padding:4px 10px;font-size:12.5px;color:var(--ink2)}
@media(min-width:768px){.hero{padding:44px 0 10px}.cta{grid-auto-flow:column;justify-content:start;align-items:center;gap:12px}.cta .btn{width:auto;min-width:240px}h1{font-size:38px;margin:12px 0 10px}}
/* readout / kpi — panel with hairline cells */
.readout,.kpis{display:grid;gap:1px;background:var(--line);border:1px solid var(--line);margin-top:20px}
.readout{grid-template-columns:repeat(2,1fr)}
.kpis{grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}
.cell,.kpi{background:var(--panel);padding:11px 13px}
.k{font-size:12px;color:var(--muted);line-height:1.45;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.v{font-size:20px;font-weight:600;line-height:1.3;margin-top:1px;font-family:var(--mono);font-variant-numeric:tabular-nums}
.u{font-size:11.5px;color:var(--muted);line-height:1.5;margin-top:1px}
.v small{font-size:11.5px;font-weight:400;color:var(--muted);font-family:var(--sans)}
@media(min-width:768px){.readout{grid-template-columns:repeat(4,1fr);margin-top:26px}}
/* plans as priced rows */
.plans{border:1px solid var(--line);background:var(--panel)}
.prow{display:grid;grid-template-columns:1fr auto;align-items:center;gap:10px;padding:12px 13px;border-top:1px solid var(--line);min-height:78px}
.prow:first-child{border-top:0}
.prow.feat{outline:1.5px solid var(--accent);outline-offset:-1px;background:#F5F8FC}
.pname{font-size:12.5px;font-weight:500;color:var(--ink2)}
.cred{font-size:14.5px;font-weight:500;margin-top:1px}
.cred .tag{font-family:var(--mono);font-size:10.5px;color:var(--accent);margin-left:6px;white-space:nowrap}
.pact{display:flex;align-items:center;gap:10px}
.price{font-family:var(--mono);font-size:24px;font-weight:600;line-height:1.15;text-align:right;min-width:56px}
.price .cur{font-size:15px;font-weight:400}
.plab{font-size:10.5px;color:var(--muted);text-align:right;line-height:1.4}
.prow.feat .price{color:var(--accent)}
.pact .btn{width:80px;white-space:nowrap}
@media(min-width:768px){.prow{grid-template-columns:1fr 120px 84px;padding:16px 18px}}
/* legacy plan cards (kept for pages not rewritten) */
.badge{position:absolute;top:12px;right:12px;font-family:var(--mono);font-size:10.5px;padding:2px 7px;border:1px solid var(--line2);border-radius:3px;color:var(--accent);background:var(--panel)}
.plan{display:flex;flex-direction:column;gap:8px;position:relative}
.plan .name{font-size:12.5px;font-weight:500;color:var(--ink2)}
.plan .price{text-align:left}
.plan .credit{font-size:14.5px}
.plan .note{font-size:12.5px;color:var(--muted);min-height:32px}
/* generic panel + card */
.card,.panel{background:var(--panel);border:1px solid var(--line);border-radius:var(--r);padding:14px}
.phead{display:flex;align-items:baseline;justify-content:space-between;gap:10px;margin-bottom:12px}
.phead .t{font-size:14.5px;font-weight:500}
.phead .r{font-family:var(--mono);font-size:10.5px;color:var(--muted)}
/* steps */
.steps{display:grid;gap:1px;background:var(--line);border:1px solid var(--line);background-color:var(--line)}
.step{display:grid;grid-template-columns:30px 1fr;gap:8px;padding:13px;background:var(--panel)}
.step .n{font-family:var(--mono);font-size:11.5px;color:var(--accent);padding-top:4px}
.step .t{font-weight:600;font-size:15px;line-height:1.5}
.step p{margin:2px 0 0;font-size:14px;line-height:1.62;color:var(--ink2)}
/* chart */
.chartbox{position:relative;height:88px}
.gl{position:absolute;left:0;right:0;height:1px;background:#E5E8EB}
.base{position:absolute;left:0;right:0;bottom:0;height:1px;background:var(--line2)}
.chart{position:relative;height:88px;display:grid;grid-template-columns:repeat(14,1fr);gap:4px}
.col{display:flex;align-items:flex-end;justify-content:center;height:88px}
.colbar{width:6px;background:var(--accent);min-height:2px}
.colbar.zero{background:var(--line2)}
.xlab{display:grid;grid-template-columns:repeat(14,1fr);gap:4px;margin-top:6px;font-family:var(--mono);font-size:10.5px;color:var(--muted);text-align:center;line-height:1.4}
.cap{display:flex;justify-content:space-between;gap:10px;font-size:12px;color:var(--muted);margin-top:8px;line-height:1.5}
.metrics{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--line);margin-top:12px}
.m{padding:10px 8px 0;border-right:1px solid var(--line)}
.m:last-child{border-right:0}
.m .k{font-size:10.5px}
.m .v{font-size:17px}
.m .d{font-size:11px;color:var(--muted);line-height:1.45}
@media(min-width:768px){.chartbox,.chart,.col{height:120px}}
/* faq */
.faq{border:1px solid var(--line);background:var(--panel)}
details{border-top:1px solid var(--line)}
details:first-child{border-top:0}
summary{display:flex;align-items:center;gap:10px;min-height:56px;padding:10px 13px;font-size:15px;font-weight:500;cursor:pointer;list-style:none;line-height:1.5}
summary::-webkit-details-marker{display:none}
summary .pm{margin-left:auto;font-family:var(--mono);font-size:16px;color:var(--muted);width:18px;text-align:center}
details[open] summary .pm{color:var(--accent)}
.ans{padding:0 13px 14px;font-size:14px;line-height:1.72;color:var(--ink2)}
/* lists */
.list{display:grid;gap:8px}
.item{display:flex;align-items:center;gap:10px;justify-content:space-between;padding:11px 13px;border:1px solid var(--line);border-radius:var(--r);background:var(--panel);font-size:14px}
.item .l{min-width:0}
.item .t{font-weight:600;font-size:14.5px}
.item .m{color:var(--muted);font-size:12.5px;line-height:1.55}
.data-list{display:grid}
.data-item{padding:10px 0;border-top:1px solid var(--line);font-size:14px}
.data-list>.data-item:first-child{border-top:0;padding-top:2px}
.data-item .t{font-weight:600}
/* usage rows */
.rows{border:1px solid var(--line);background:var(--panel)}
.r{display:grid;grid-template-columns:1fr auto auto;gap:10px;align-items:center;padding:10px 13px;border-top:1px solid var(--line)}
.r:first-child{border-top:0}
.r .tm{font-family:var(--mono);font-size:12.5px;line-height:1.45}
.r .md{font-family:var(--mono);font-size:11.5px;color:var(--muted);line-height:1.45}
.r .tk{font-family:var(--mono);font-size:13px;text-align:right;white-space:nowrap}
.r .st{font-family:var(--mono);font-size:12px;color:var(--ok);min-width:38px;text-align:right}
.rhead{display:grid;grid-template-columns:1fr auto auto;gap:10px;padding:0 13px 5px;font-size:11px;color:var(--muted)}
.rhead span:nth-child(2){text-align:right}
.rhead span:nth-child(3){min-width:38px;text-align:right}
/* key/value */
.kv{display:grid;gap:1px;padding:9px 0;border-top:1px solid var(--line)}
.kv:first-child{border-top:0;padding-top:0}
.kv .k2{font-size:11.5px;color:var(--muted);line-height:1.6}
.kv .v2{font-family:var(--mono);font-size:12px;line-height:1.7;overflow-wrap:anywhere}
@media(min-width:768px){.kv{grid-template-columns:76px 1fr;gap:8px}}
/* code */
.pre{background:var(--soft);border:1px solid var(--line);border-radius:var(--r);padding:12px;margin:10px 0 0;font-size:12px;line-height:1.85;white-space:pre-wrap;overflow-wrap:break-word;color:var(--ink);overflow-x:auto}
.codebox{display:flex;flex-direction:column;background:var(--soft);border:1px solid var(--line);border-radius:var(--r);margin:10px 0;overflow:hidden}
.codebox .copy{position:static;align-self:flex-end;margin:8px 8px 0 auto}
pre.code{margin:0;padding:0 14px 14px;overflow-x:auto;font-size:12.5px;line-height:1.75;color:var(--ink);white-space:pre}
.codehint{font-size:12px;color:var(--ink2);margin:7px 0 0;line-height:1.55}
.ep{font-family:var(--mono);font-size:11.5px;color:var(--muted);margin-top:10px;line-height:1.9;overflow-wrap:anywhere}
.ep b{color:var(--ink2);font-weight:500}
/* tables */
.tbl-wrap{overflow-x:auto;border:1px solid var(--line);border-radius:var(--r);background:var(--panel)}
table.tbl{width:100%;border-collapse:collapse;font-size:13px;white-space:nowrap}
.tbl th{text-align:left;color:var(--muted);font-weight:500;font-size:11.5px;padding:9px 12px;border-bottom:1px solid var(--line);background:var(--soft)}
.tbl td{padding:9px 12px;border-bottom:1px solid var(--line);color:var(--ink)}
.tbl tr:last-child td{border-bottom:none}
.tbl td.num,.tbl th.num{text-align:right;font-variant-numeric:tabular-nums}
.tbl tfoot td{border-top:1px solid var(--line2);font-weight:600;background:var(--soft)}
/* status chips */
.status{display:inline-flex;align-items:center;font-family:var(--mono);font-size:11.5px;line-height:1.5;padding:1px 7px;border-radius:3px;border:1px solid;white-space:nowrap}
.s-ok{color:var(--ok);background:#EAF4EE;border-color:#C6E0D2}
.s-err{color:var(--err);background:#FDF2F1;border-color:#E8CBC6}
.s-warn{color:var(--warn);background:#FBF3E4;border-color:#E6D6B4}
/* forms */
.input,textarea,select{width:100%;background:var(--panel);border:1px solid var(--line2);color:var(--ink);padding:11px 12px;border-radius:var(--r);font-size:15px;font-family:inherit}
.input:focus,textarea:focus,select:focus{border-color:var(--accent);box-shadow:none;outline:2px solid var(--accent);outline-offset:-1px}
label.lbl{display:block;font-size:12.5px;color:var(--muted);margin:12px 0 5px}
.form .btn{margin-top:16px;width:100%}
.flash{border-radius:var(--r);padding:11px 13px;font-size:14px;margin:14px 0;border:1px solid;line-height:1.6}
.flash.ok{background:#EAF4EE;border-color:#C6E0D2;color:#0B5334}
.flash.err{background:#FDF2F1;border-color:#E8CBC6;color:#8D1B12}
.flash.info{background:#EDF2F8;border-color:#C9D8E8;color:#12395E}
.warnbox{border:1px solid #E6D6B4;background:#FBF3E4;color:#6E4A00;padding:11px 13px;border-radius:var(--r);font-size:13.5px;line-height:1.6}
.warnbox a{color:#8A5B00;text-decoration:underline}
.keybox{border:1px dashed var(--line2);background:#F7FAFD;border-radius:var(--r);padding:13px;margin:12px 0}
.qr{background:#fff;padding:10px;border:1px solid var(--line);width:240px;height:240px;display:grid;place-items:center}
@media(max-width:640px){.qr{width:220px;height:220px}}
/* credit bar */
.creditbar{display:flex;flex-wrap:wrap;align-items:center;gap:12px;background:var(--panel);border:1px solid var(--line);border-radius:var(--r);padding:14px}
.creditbar .lbl{font-size:11.5px;color:var(--muted)}
.creditbar .bal{font-family:var(--mono);font-size:32px;font-weight:600;line-height:1.2;letter-spacing:-.5px}
.creditbar .note{font-size:12.5px;color:var(--muted);margin-top:2px;max-width:54ch;line-height:1.55}
.creditbar .note a{color:var(--accent);text-decoration:underline}
.creditbar.is-low{background:#FBF3E4;border-color:#E6D6B4}
.creditbar.is-low .bal{color:var(--warn)}
/* misc */
.periods{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line)}
.periods>div{background:var(--panel);padding:2px 10px}
.periods .k{font-size:11px}
.periods .v{font-size:15px}
.periods .u{font-size:11px}
.amt-pos{color:var(--ok);font-weight:600}
.amt-neg{color:var(--err);font-weight:600}
.url{font-size:13px}
.base-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.conn-meta{display:grid;gap:2px}
.desk-only{display:block}
.usage-table{display:block}
@media(max-width:700px){
  .desk-only,.usage-table{display:none!important}
  .hide-sm{display:none!important}
  .tbl{white-space:normal}
  .tbl td,.tbl th{word-break:break-word;overflow-wrap:anywhere;padding:7px 9px;font-size:12.5px}
  .tbl .num{white-space:nowrap}
  .wrap{padding:0 14px}
  .card,.panel{padding:13px}
  .hero{padding:24px 0 4px}
  h1{font-size:25px}
  .lead{font-size:15px}
  .codebox pre.code{white-space:pre-wrap;word-break:break-word;font-size:11.5px}
  .pre{font-size:11.5px}
  section{padding:22px 0 2px}
  .creditbar .bal{font-size:28px}
  .creditbar .btn{width:100%}
  .periods{grid-template-columns:1fr}
  .metrics{grid-template-columns:1fr}
  .m{border-right:0;border-top:1px solid var(--line);padding:8px 0 0}
  .m:first-child{border-top:0}
}
footer.site{border-top:1px solid var(--line);margin-top:30px;padding:18px 0 36px;font-size:12.5px;color:var(--muted);line-height:1.8}
footer.site .fl{display:flex;flex-wrap:wrap;gap:2px 14px;margin:6px 0}
footer.site a{display:inline-flex;align-items:center;min-height:44px;color:var(--accent)}
@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
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

function dayNum(d) {
  const p = String(d || '').split('-');
  return p.length === 3 ? p[2] : '';
}

function fmtUptime(sec) {
  const s = Math.max(0, Math.round(Number(sec) || 0));
  if (s >= 86400) return `${Math.floor(s / 86400)} วัน ${Math.floor((s % 86400) / 3600)} ชม.`;
  if (s >= 3600) return `${Math.floor(s / 3600)} ชม. ${Math.floor((s % 3600) / 60)} น.`;
  if (s >= 60) return `${Math.floor(s / 60)} น.`;
  return `${s} วิ`;
}

// 14-day bar chart (heights in %, so it scales between the 88px and 120px layouts)
function chart14(days) {
  const arr = Array.isArray(days) ? days.slice(-14).map((x) => ({ d: x && x.d, n: Number(x && x.n) || 0 })) : [];
  while (arr.length < 14) arr.unshift({ d: '', n: 0 });
  const max = Math.max(1, ...arr.map((x) => x.n));
  const total = arr.reduce((a, x) => a + x.n, 0);
  const bars = arr.map((x) => {
    const h = x.n ? Math.max(4, Math.round((x.n / max) * 100)) : 0;
    return `<div class="col"><div class="colbar${x.n ? '' : ' zero'}" style="height:${h ? h + '%' : '2px'}"></div></div>`;
  }).join('');
  const lab = arr.map((x, i) => `<span>${(i % 3 === 1 || i === 13) ? dayNum(x.d) : ''}</span>`).join('');
  return `<div class="chartbox"><div class="gl" style="top:0"></div><div class="gl" style="top:33%"></div><div class="gl" style="top:66%"></div><div class="base"></div><div class="chart" role="img" aria-label="กราฟแท่งจำนวนคำขอ 14 วันล่าสุด สูงสุด ${max} คำขอต่อวัน">${bars}</div></div><div class="xlab">${lab}</div><div class="cap"><span>${total ? `รวม ${tok(total)} คำขอ · สูงสุด ${max}/วัน` : 'ยังไม่มีคำขอในช่วง 14 วัน'}</span><span>14 วันล่าสุด</span></div>`;
}

function statsPanel(stats) {
  const s = stats || {};
  const okRate = s.okRate != null ? `${s.okRate}%` : '—';
  return `<div class="panel">
      <div class="phead"><span class="t">คำขอต่อวัน</span><span class="r">14 วัน</span></div>
      ${chart14(s.days14)}
      <div class="metrics">
        <div class="m"><div class="k">คำขอ 24 ชม.</div><div class="v">${tok(s.req24 || 0)}</div><div class="d">7 วัน ${tok(s.req7d || 0)} คำขอ</div></div>
        <div class="m"><div class="k">อัตราสำเร็จ</div><div class="v">${okRate}</div><div class="d">นับจาก 7 วันล่าสุด</div></div>
        <div class="m"><div class="k">ฐานข้อมูล</div><div class="v" style="font-family:var(--sans);font-size:15px">${s.dbOk ? '<span class="dot"></span>ปกติ' : 'ติดขัด'}</div><div class="d">${s.dbOk ? `${Number(s.dbMs) || 0} ms` : 'ตรวจไม่ผ่าน'}</div></div>
      </div>
    </div>`;
}

export function layout({ title = 'JapexisKey', user = null, active = '', content = '', noindex = false }) {
  const navUser = user
    ? `<span class="balance-pill">฿${thb(user.balance_thb)}</span><a class="btn sm" href="/app">แดชบอร์ด</a>${user.role === 'admin' ? '<a class="btn sm hide-sm" href="/admin">แอดมิน</a>' : ''}`
    : `<a class="btn primary sm" href="/login">เข้าสู่ระบบ</a>`;
  const navLink = (href, label, key) => `<a href="${href}"${active === key ? ' class="on"' : ''}>${label}</a>`;
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="JapexisKey — คีย์ AI ราคาบาท เริ่ม ฿10 จ่ายครั้งเดียว ใช้เท่าไรจ่ายเท่านั้น ดูประวัติการใช้ได้ทุกคำขอ">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='5' fill='%2314487F'/%3E%3Ctext x='16' y='23' font-size='18' font-family='monospace' font-weight='bold' text-anchor='middle' fill='%23ffffff'%3EJ%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;500;600&display=swap" rel="stylesheet">
<style>${CSS}</style>
</head>
<body>
<header class="site"><div class="wrap nav">
  <a class="brand" href="/"><span class="logo">J</span>JapexisKey<span class="tid">KEY API · THB</span></a>
  <nav class="nav-links">
    ${navLink('/', 'หน้าแรก', 'home')}${navLink('/pricing', 'ราคา', 'buy')}${navLink('/docs', 'เอกสาร API', 'docs')}${user && user.role === 'admin' ? navLink('/stats', 'สถานะระบบ', 'stats') : ''}
  </nav>
  <div class="right">${navUser}</div>
</div></header>
<main class="wrap">${content}</main>
<footer class="site"><div class="wrap" style="padding:0">
  <div class="brand" style="font-size:14.5px"><span class="logo" style="width:20px;height:20px;font-size:11px">J</span>JapexisKey</div>
  <div class="fl"><a href="/docs">เอกสาร API</a><a href="/pricing">ราคา</a><a href="/help">ช่วยเหลือ</a><a href="/status">สถานะ</a><a href="/privacy">ความเป็นส่วนตัว</a>${user ? '<a href="/logout">ออกจากระบบ</a>' : '<a href="/login">เข้าสู่ระบบ</a>'}</div>
  <div>© ${new Date().getFullYear()} JapexisKey · ไม่เก็บข้อความที่ส่ง · ล็อกอินด้วย Google เท่านั้น</div>
</div></footer>
<script>
document.addEventListener('click', function (e) {
  var b = e.target.closest('[data-copy]');
  if (!b) return;
  var t = b.getAttribute('data-copy');
  var done = function () {
    var old = b.textContent; b.textContent = 'คัดลอกแล้ว';
    setTimeout(function () { b.textContent = old; }, 1400);
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

export function landing({ plans, prices, baseUrl, google = false, model = 'deepseek-v4.1-flash', user = null, payReady = true, stats = null }) {
  const s = stats || {};
  const planRows = plans.map((p) => {
    const feat = p.code === 'B';
    const extra = Number(p.credit_thb) > Number(p.price_thb)
      ? `<span class="tag">+${Math.round((Number(p.credit_thb) / Number(p.price_thb) - 1) * 100)}%</span>`
      : '';
    const btn = payReady
      ? `<a class="btn sm${feat ? ' primary' : ''}" href="/buy/${esc(p.code)}">เลือก</a>`
      : '<a class="btn sm" href="/pricing">ดู</a>';
    return `<div class="prow${feat ? ' feat' : ''}">
        <div><div class="pname">แผน ${esc(p.code)}</div><div class="cred">ได้เครดิต <span class="num">฿${thb(p.credit_thb, 0)}</span>${extra}</div></div>
        <div class="pact"><div><div class="plab">จ่าย</div><div class="price num"><span class="cur">฿</span>${thb(p.price_thb, 0)}</div></div>${btn}</div>
      </div>`;
  }).join('');

  const content = `
  <section class="hero">
    <div class="eyebrow"><i></i>${s.dbOk === false ? 'ระบบบางส่วนขัดข้อง' : 'ระบบทำงานปกติ'} · OpenAI-compatible</div>
    <h1>คีย์ AI ราคาบาท<br>เริ่ม <em>฿10</em> จ่ายครั้งเดียว</h1>
    <p class="lead">โมเดล DeepSeek V4.1 Flash ผ่าน API มาตรฐาน OpenAI — สมัครด้วย Google, จ่ายผ่าน PromptPay QR, ได้คีย์ทันที ไม่มีค่าสมัคร ไม่มีรายเดือน</p>
    <div class="cta">
      <a class="btn primary big" href="${google ? '/auth/google' : '/login'}">${google ? 'สมัครด้วย Google' : 'เข้าสู่ระบบ'}</a>
      <a class="btn ghost" href="/docs">ดูวิธีใช้ API</a>
    </div>
    <p class="small" style="margin:0">บัญชีใหม่ได้เครดิตทดลอง ฿10 (ครั้งเดียวต่อผู้ใช้/อุปกรณ์) · ล็อกอินด้วย Google เท่านั้น</p>
    <div class="readout">
      <div class="cell"><div class="k">ขาเข้า / 1M โทเคน</div><div class="v">฿${thb(prices.in, 2)}</div></div>
      <div class="cell"><div class="k">ขาออก / 1M โทเคน</div><div class="v">฿${thb(prices.out, 2)}</div></div>
      <div class="cell"><div class="k">จากแคช / 1M โทเคน</div><div class="v">฿${thb(prices.cacheRead, 2)}</div></div>
      <div class="cell"><div class="k">จำกัดการเรียก</div><div class="v">30<small> คำขอ/นาที</small></div></div>
    </div>
  </section>

  <section>
    <h2>แพ็กเกจ</h2>
    <p class="sub">${payReady ? 'จ่ายครั้งเดียวผ่าน PromptPay QR · เครดิตไม่มีวันหมดอายุ' : 'ขณะนี้ยังไม่เปิดรับชำระเงินออนไลน์ — <a href="/help" style="color:var(--accent)">ติดต่อฝ่ายบริการลูกค้า</a>'}</p>
    <div class="plans">${planRows}</div>
  </section>

  <section>
    <h2>ใช้งาน 3 ขั้น</h2>
    <p class="sub">จากสมัครถึงเรียก API แรกได้ในไม่กี่นาที</p>
    <div class="steps">
      <div class="step"><div class="n">01</div><div><div class="t">สมัครด้วย Google</div><p>ล็อกอินบัญชี Google ครั้งเดียว ระบบออกคีย์ JXK- ให้อัตโนมัติ พร้อมเครดิตทดลอง ฿10</p></div></div>
      <div class="step"><div class="n">02</div><div><div class="t">เติมเครดิต</div><p>${payReady ? 'เลือกแพ็กเกจ สแกน PromptPay QR แล้วแจ้งเลขอ้างอิงสลิป เจ้าหน้าที่ตรวจสอบและเติมเครดิตให้' : 'เมื่อเปิดรับชำระเงินแล้ว เลือกแพ็กเกจและชำระผ่าน PromptPay QR ได้ในหน้านี้'}</p></div></div>
      <div class="step"><div class="n">03</div><div><div class="t">วางคีย์แล้วเรียก API</div><p>ใช้ที่อยู่ API ด้านล่างแทนของ OpenAI ได้เลย เปลี่ยนแค่คีย์และชื่อโมเดล</p></div></div>
    </div>
    <pre class="pre">BASE=${esc(baseUrl)}/v1
curl -s $BASE/chat/completions \\
  -H "Authorization: Bearer JXK-…" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"${esc(model)}",
    "messages":[{"role":"user","content":"สวัสดี"}]}'</pre>
    <p class="codehint">แทน JXK-… ด้วยคีย์ของคุณ · ใช้ได้กับ SDK ทุกตัวที่ตั้ง base URL แบบ OpenAI</p>
    <div class="ep">
      <div><b>POST</b> /v1/chat/completions · รองรับสตรีม</div>
      <div><b>GET</b> /v1/models · /v1/me · /v1/usage</div>
    </div>
  </section>

  <section>
    <h2>การใช้งานระบบ</h2>
    <p class="sub">ตัวเลขจริงจากฐานข้อมูลของเว็บนี้ · อัปเดตทุก 30 วินาที</p>
    ${statsPanel(s)}
  </section>

  <section>
    <h2>คำถามที่พบบ่อย</h2>
    <div class="faq">
      <details><summary>จ่ายเงินอย่างไร คิดรายเดือนไหม<span class="pm">+</span></summary><div class="ans">จ่ายครั้งเดียวผ่าน PromptPay QR ไม่มีค่าสมัครและไม่มีรายเดือน · ${payReady ? 'หลังชำระแล้วแจ้งเลขอ้างอิงสลิปหรือเวลาโอน เจ้าหน้าที่จะตรวจสอบและเติมเครดิตให้' : 'ปัจจุบันยังไม่เปิดรับชำระเงินออนไลน์ กรุณาติดต่อฝ่ายบริการลูกค้า'} · เครดิตที่ได้ไม่มีวันหมดอายุ</div></details>
      <details><summary>ได้คีย์เมื่อไร<span class="pm">+</span></summary><div class="ans">ทันทีที่ล็อกอินด้วย Google ระบบออกคีย์ JXK- ให้ในหน้าแดชบอร์ด คีย์จะแสดงเต็มครั้งเดียวตอนสร้าง ถ้าไม่ได้เก็บไว้ให้สร้างคีย์ใหม่</div></details>
      <details><summary>ใช้กับแอปอะไรได้บ้าง<span class="pm">+</span></summary><div class="ans">แอปและ SDK ที่รองรับ OpenAI API เช่น Cursor, Cline, OpenCode และ n8n โดยตั้งที่อยู่ API เป็น <span class="mono">${esc(baseUrl)}/v1</span> แล้วใช้คีย์ของคุณ</div></details>
      <details><summary>เครดิตทดลองได้เมื่อไร<span class="pm">+</span></summary><div class="ans">บัญชีใหม่ที่ล็อกอินด้วย Google ได้ ฿10 ครั้งเดียวต่อผู้ใช้/อุปกรณ์ ใช้เรียก API ได้จริงก่อนเติมเงิน — ถ้าถูกจำกัดระบบจะแจ้งให้ทราบตอนสมัคร</div></details>
      <details><summary>ดูประวัติการใช้ละเอียดแค่ไหน<span class="pm">+</span></summary><div class="ans">ทุกคำขอแสดงเวลา สถานะ จำนวนโทเคนขาเข้า/ขาออก โทเคนจากแคช เวลาตอบ และค่าใช้จ่ายเป็นบาท ดาวน์โหลดเป็น CSV ได้จากหน้าใช้งาน</div></details>
      <details><summary>เก็บข้อความที่ส่งไหม ยิงถี่ได้แค่ไหน<span class="pm">+</span></summary><div class="ans">ไม่เก็บข้อความที่ส่งหรือคำตอบของโมเดล เก็บเฉพาะจำนวนโทเคนและค่าใช้จ่าย · จำกัด 30 คำขอ/นาที/คีย์ และ max_tokens 8,192 ต่อคำขอ</div></details>
    </div>
  </section>`;
  return layout({ title: 'JapexisKey — คีย์ AI ราคาบาท เริ่ม ฿10', content, active: 'home', user });
}

export function pricingPage({ plans, prices, user = null, payReady = true, model = 'deepseek-v4.1-flash', flash = '', stats = null }) {
  const planRows = plans.map((p) => {
    const feat = p.code === 'B';
    const credit = Number(p.credit_thb || 0);
    const inRate = Number(prices && prices.in ? prices.in : 0);
    const tokIn = inRate > 0 ? (credit / inRate) * 1000000 : 0;
    const extra = credit > Number(p.price_thb) ? `<span class="tag">+${Math.round((credit / Number(p.price_thb) - 1) * 100)}%</span>` : '';
    const tokLine = tokIn > 0
      ? (tokIn >= 1000000 ? `${(tokIn / 1000000).toFixed(1)} ล้านโทเคนขาเข้า` : `${tok(tokIn)} โทเคนขาเข้า`)
      : '';
    const cta = !payReady
      ? '<button class="btn sm" type="button" disabled>ปิดรับ</button>'
      : user
        ? `<a class="btn sm${feat ? ' primary' : ''}" href="/buy/${esc(p.code)}">ซื้อ</a>`
        : `<a class="btn sm${feat ? ' primary' : ''}" href="/login">เข้าสู่ระบบ</a>`;
    return `<div class="prow${feat ? ' feat' : ''}">
        <div>
          <div class="pname">แผน ${esc(p.code)}</div>
          <div class="cred">ได้เครดิต <span class="num">฿${thb(credit, 0)}</span>${extra}</div>
          ${tokLine ? `<div class="small" style="margin-top:2px">ใช้ได้ประมาณ ${tokLine}</div>` : ''}
        </div>
        <div class="pact"><div><div class="plab">จ่าย</div><div class="price num"><span class="cur">฿</span>${thb(p.price_thb, 0)}</div></div>${cta}</div>
      </div>`;
  }).join('');

  const content = `
  <section style="padding-top:26px">
    <h1 style="font-size:28px">ราคาและแพ็กเกจ</h1>
    <p class="sub">จ่ายครั้งเดียว · เครดิตไม่มีวันหมดอายุ · บัญชีใหม่ได้เครดิตทดลอง ฿10 เมื่อล็อกอินครั้งแรก</p>
    ${flash ? `<div class="flash info">${esc(flash)}</div>` : ''}
    ${payReady ? '' : '<div class="warnbox" style="margin:12px 0"><b>ยังไม่เปิดรับชำระเงินออนไลน์</b><div class="small" style="margin-top:4px;color:#6E4A00">ขณะนี้ยังสร้างคำสั่งซื้อไม่ได้ — <a href="/help">ติดต่อฝ่ายบริการลูกค้า</a>เพื่อรับข้อมูลการเติมเครดิต</div></div>'}
    <div class="plans" style="margin-top:12px">${planRows}</div>

    <div class="panel" style="margin-top:16px">
      <div class="phead"><span class="t">อัตราค่าใช้จ่าย</span><span class="r">ต่อ 1 ล้านโทเคน</span></div>
      <div class="kv"><div class="k2">โทเคนขาเข้า</div><div class="v2">฿${thb(prices.in, 2)}</div></div>
      <div class="kv"><div class="k2">โทเคนขาออก</div><div class="v2">฿${thb(prices.out, 2)}</div></div>
      <div class="kv"><div class="k2">โทเคนจากแคช</div><div class="v2">฿${thb(prices.cacheRead, 2)}</div></div>
      <div class="kv"><div class="k2">โมเดล</div><div class="v2">DeepSeek V4.1 Flash · ${esc(model)}</div></div>
      <p class="small" style="margin:10px 0 0">คิดตามจำนวนโทเคนที่ใช้จริง ไม่มีค่าบริการขั้นต่ำต่อคำขอ · จำกัด 30 คำขอ/นาที/คีย์</p>
    </div>

    <div class="panel" style="margin-top:12px">
      <div class="t" style="font-size:14.5px;font-weight:500;margin-bottom:6px">ชำระเงินอย่างไร</div>
      <p class="small" style="margin:0">${payReady
        ? 'สร้างคำสั่งซื้อ → สแกน PromptPay QR ในแอปธนาคาร → แจ้งเลขอ้างอิงสลิปหรือเวลาโอน → เจ้าหน้าที่ตรวจสอบและเติมเครดิตให้ (ปกติภายในเวลาทำการ)'
        : 'เมื่อเปิดรับชำระเงินแล้ว ขั้นตอนคือ สร้างคำสั่งซื้อ → สแกน PromptPay QR → แจ้งหลักฐานการโอน → เจ้าหน้าที่เติมเครดิตให้'}</p>
    </div>

    <div class="row" style="margin-top:16px">
      ${user ? '<a class="btn primary" href="/app">ไปที่แดชบอร์ด</a>' : '<a class="btn primary" href="/login">เข้าสู่ระบบเพื่อเริ่มใช้งาน</a>'}
      <a class="btn" href="/docs">เอกสาร API</a>
      <a class="link" href="/status" style="font-size:13.5px">สถานะระบบ</a>
    </div>
  </section>`;
  return layout({ title: 'ราคาและแพ็กเกจ — JapexisKey', content, active: 'buy', user });
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

export function dashPage({ user, keys, newKey, stats, recent, orders, baseUrl, model, flash, credit = null, udays = null }) {
  const keyStatus = (k) => (k.revoked ? '<span class="status s-err">ปิดใช้งาน</span>' : '<span class="status s-ok">ใช้งานอยู่</span>');
  const revokeBtn = (k) => (k.revoked ? '' : `<form method="post" action="/app/keys/${k.id}/revoke" onsubmit="return confirm('ปิดใช้งานคีย์นี้? แอปที่ใช้คีย์นี้จะใช้งานไม่ได้ทันที')"><button class="btn sm danger" type="submit">ปิดใช้งาน</button></form>`);

  const keyRows = keys.map((k) => `
      <div class="r" style="grid-template-columns:1fr auto">
        <div>
          <div class="tm">${esc(k.name === 'default' ? 'คีย์หลัก' : k.name)} <span class="md">${esc(k.prefix)}…</span></div>
          <div class="md" style="margin-top:2px">สร้าง ${dt(k.created_at)} · ใช้ล่าสุด ${k.last_used_at ? dt(k.last_used_at) : 'ยังไม่ใช้'}</div>
        </div>
        <div style="display:grid;gap:6px;justify-items:end">${keyStatus(k)}${revokeBtn(k)}</div>
      </div>`).join('') || '<div class="r"><div class="md">ยังไม่มีคีย์ — กด “สร้างคีย์ใหม่” ด้านบน</div></div>';

  const recentRows = recent.slice(0, 6).map((r) => `
      <div class="r">
        <div><div class="tm">${dt(r.created_at)}</div><div class="md">${tok(r.prompt_tokens)} เข้า · ${tok(r.completion_tokens)} ออก · ${tok(r.cache_read_tokens)} แคช</div></div>
        <div class="tk">${money(r.cost_thb)}</div>
        <div class="st">${httpChip(r.status)}</div>
      </div>`).join('');

  const orderItems = orders.map((o) => `
      <div class="item">
        <div class="l"><div class="t">${esc(o.ref)} · แผน ${esc(o.plan_code)}</div><div class="m">฿${thb(o.amount_thb, 0)} → เครดิต ฿${thb(o.credit_thb, 0)} · ${dt(o.created_at)}</div></div>
        <div class="row" style="gap:8px">${statusChip(o.status)} ${o.status !== 'paid' && o.status !== 'cancelled' ? `<a class="btn sm" href="/order/${esc(o.ref)}">ดู/จ่าย</a>` : ''}</div>
      </div>`).join('');

  const bal = Number(user.balance_thb || 0);
  const est = credit && credit.estRequests != null ? Number(credit.estRequests) : null;
  const low = Boolean(credit && credit.low);
  const basis = credit && credit.basis === 'last' ? 'อิงจากคำขอล่าสุด' : 'จากค่าใช้จ่ายเฉลี่ย 30 วัน';
  const estText = est == null ? '' : est > 9999 ? 'มากกว่า 10,000 คำขอ' : `ประมาณ ${tok(est)} คำขอ`;
  const remainNote = bal <= 0
    ? 'เครดิตหมดแล้ว — เติมเพื่อใช้งานต่อ'
    : low
      ? (est != null ? `เครดิตใกล้หมด — เหลือ${estText} (${basis})` : 'เครดิตใกล้หมด เติมก่อนเพื่อไม่ให้คำขอถูกปฏิเสธ (402)')
      : est != null
        ? `เหลือใช้ได้${estText} (${basis})`
        : 'เครดิตพร้อมใช้ — ยังไม่มีข้อมูลการใช้';

  const req = Number(stats.requests || 0);
  const days14 = Array.isArray(udays) ? udays : null;
  const usagePanel = req > 0
    ? `<div class="panel">
        <div class="phead"><span class="t">คำขอต่อวัน</span><span class="r">14 วัน</span></div>
        ${chart14(days14)}
      </div>`
    : `<div class="panel">
        <div class="phead"><span class="t">คำขอต่อวัน</span><span class="r">14 วัน</span></div>
        ${chart14(days14)}
        <div style="text-align:center;padding:12px 6px 2px">
          <div style="font-size:14px;font-weight:500">ยังไม่มีคำขอในช่วง 14 วัน</div>
          <div class="small">เรียก API ครั้งแรกแล้วกราฟจะขึ้นที่นี่ · เครดิตคงเหลือยังใช้ได้ตามปกติ</div>
          <div class="row" style="justify-content:center;margin-top:10px;gap:8px">
            <button class="btn sm" data-copy="${esc(baseUrl)}/v1">คัดลอกที่อยู่ API</button>
            <a class="btn sm" href="/docs">ดูตัวอย่างโค้ด</a>
          </div>
        </div>
      </div>`;

  const content = `
  <section style="padding-top:22px">
    <div class="row" style="gap:8px;flex-wrap:wrap;align-items:center">
      <div>
        <div class="eyebrow"><i></i>${user.status === 'active' ? 'บัญชีใช้งานอยู่' : 'บัญชีถูกระงับ'} · ${esc(user.email || '')}</div>
        <h1 style="font-size:24px;margin:6px 0 0">ภาพรวมบัญชี</h1>
      </div>
      <div class="spacer"></div>
      <a class="btn sm" href="/app/usage">ประวัติการใช้งาน</a>
    </div>
    ${flash ? `<div class="flash ok">${esc(flash)}</div>` : ''}
    ${user.status !== 'active' ? '<div class="warnbox" style="margin-top:14px"><b>บัญชีนี้ถูกระงับ</b> — คีย์ทั้งหมดจะตอบ 403 จนกว่าจะคืนสิทธิ์ กรุณาติดต่อฝ่ายบริการลูกค้า</div>' : ''}

    <div class="creditbar${low ? ' is-low' : ''}" style="margin-top:14px">
      <div>
        <div class="lbl">เครดิตคงเหลือ</div>
        <div class="bal">฿${thb(bal, 2)}</div>
        <div class="note">${remainNote} · <a href="/app/credit">ประวัติเครดิต</a></div>
      </div>
      <div class="spacer"></div>
      <a class="btn primary" href="/buy">เติมเครดิต</a>
    </div>

    <div class="readout" style="margin-top:12px">
      <div class="cell"><div class="k">คำขอ · 30 วัน</div><div class="v">${tok(req)}</div></div>
      <div class="cell"><div class="k">โทเคนขาเข้า</div><div class="v">${tok(stats.pt)}</div></div>
      <div class="cell"><div class="k">โทเคนขาออก</div><div class="v">${tok(stats.ct)}</div></div>
      <div class="cell"><div class="k">ค่าใช้จ่าย · 30 วัน</div><div class="v">${money(stats.cost)}</div></div>
    </div>
    <p class="small" style="margin:8px 0 0">โทเคนจากแคช ${tok(stats.cat)} · ${newKey ? '' : ''}นับเฉพาะคำขอใน 30 วันล่าสุด</p>

    <h2 style="margin-top:22px">การใช้ 14 วัน</h2>
    <p class="sub">นับตามวันที่คำขอถูกบันทึก (เวลาไทย)</p>
    ${usagePanel}

    ${newKey ? `<div class="keybox" style="margin-top:18px">
      <div style="font-weight:600;color:var(--accent)">คีย์ใหม่ของคุณ — แสดงครั้งเดียว</div>
      <div class="mono" style="font-size:13px;word-break:break-all;margin:8px 0 10px">${esc(newKey)}</div>
      <button class="btn sm primary" data-copy="${esc(newKey)}">คัดลอกคีย์</button>
    </div>` : ''}

    <h2 style="margin-top:22px">คีย์ API</h2>
    <p class="sub">คีย์เต็มแสดงครั้งเดียวตอนสร้าง · ถ้าไม่ได้เก็บไว้ให้สร้างใหม่</p>
    <div class="row" style="margin:0 0 10px">
      <form method="post" action="/app/keys"><button class="btn sm" type="submit">สร้างคีย์ใหม่</button></form>
      <span class="small">${keys.length ? `${keys.filter((k) => !k.revoked).length} คีย์ที่ใช้งานอยู่` : ''}</span>
    </div>
    <div class="rows">${keyRows}</div>

    <h2 style="margin-top:22px">คำขอล่าสุด</h2>
    <p class="sub">${recent.length ? `${recent.length} รายการล่าสุด · เรียงจากใหม่ไปเก่า` : 'ยังไม่มีการเรียก API'}</p>
    ${recent.length ? `<div class="rhead"><span>เวลา · โทเคน</span><span>ค่าใช้จ่าย</span><span>สถานะ</span></div><div class="rows">${recentRows}</div>
      <div class="row" style="margin-top:10px"><a class="btn sm" href="/app/usage">ดูทั้งหมด</a><a class="link" href="/app/usage.csv?range=30" style="font-size:13.5px">ดาวน์โหลด CSV</a></div>`
    : '<div class="panel"><div class="small">ยังไม่มีการใช้งาน — เริ่มได้จากตัวอย่างโค้ดด้านล่าง หรือ <a href="/docs" style="color:var(--accent)">อ่านวิธีเชื่อมต่อ</a></div></div>'}

    <h2 style="margin-top:22px">การเชื่อมต่อ API</h2>
    <p class="sub">ใช้แทน OpenAI ได้โดยเปลี่ยนที่อยู่ API และคีย์</p>
    <div class="panel">
      <div class="kv"><div class="k2">ที่อยู่</div><div class="v2">${esc(baseUrl)}/v1</div></div>
      <div class="kv"><div class="k2">หัวข้อ</div><div class="v2">Authorization: Bearer JXK-…</div></div>
      <div class="kv"><div class="k2">โมเดล</div><div class="v2">${esc(model)}</div></div>
      <div class="kv"><div class="k2">เอนด์พอยต์</div><div class="v2">POST /v1/chat/completions · สตรีมได้<br>GET /v1/models · /v1/me · /v1/usage</div></div>
      <div class="row" style="margin-top:12px">
        <button class="btn sm" data-copy="${esc(baseUrl)}/v1">คัดลอกที่อยู่ API</button>
        <a class="btn sm" href="/docs">ตัวอย่างโค้ด</a>
      </div>
      <p class="small" style="margin:10px 0 0">30 คำขอ/นาที/คีย์ · max_tokens 8,192 · ไม่เก็บข้อความที่ส่ง</p>
    </div>

    ${orderItems ? `<h2 style="margin-top:22px">คำสั่งซื้อของฉัน</h2><div class="list">${orderItems}</div>` : ''}

    <p class="small" style="margin:20px 0 0">สมัคร ${dt(user.created_at)} · ${user.status === 'active' ? '<span class="status s-ok">ใช้งานอยู่</span>' : '<span class="status s-err">ถูกระงับ</span>'} · <a href="/help" style="color:var(--accent)">ติดต่อฝ่ายบริการลูกค้า</a></p>
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

export function usagePage({ user, stats, rows, range, periods = null, udays = null }) {
  const ranges = [['7', '7 วัน'], ['30', '30 วัน'], ['all', 'ทั้งหมด']];
  const tabs = ranges.map(([k, label]) => `<a class="btn sm${range === k ? ' primary' : ' ghost'}" href="/app/usage?range=${k}">${label}</a>`).join('');

  const list = rows.map((r) => `
      <div class="r">
        <div>
          <div class="tm">${dt(r.created_at)}${r.stream ? ' · สตรีม' : ''}${r.estimated ? ' · ประมาณ' : ''}</div>
          <div class="md">${tok(r.prompt_tokens)} เข้า · ${tok(r.completion_tokens)} ออก · ${tok(r.cache_read_tokens)} แคช · ${r.latency_ms ? (r.latency_ms / 1000).toFixed(1) + ' วิ' : '—'}</div>
        </div>
        <div class="tk">${money(r.cost_thb)}</div>
        <div class="st">${httpChip(r.status)}</div>
      </div>`).join('') || `<div class="r"><div class="md">ไม่มีข้อมูลในช่วงนี้ — ลองเลือกช่วง “ทั้งหมด” หรือเรียก API แล้วกลับมาดู</div></div>`;

  const trs = rows.map((r) => `
      <tr>
        <td class="mono">${dt(r.created_at)}</td>
        <td class="hide-sm mono">${esc(displayModel(r.model))}${r.stream ? ' · สตรีม' : ''}${r.estimated ? ' · ประมาณ' : ''}</td>
        <td>${httpChip(r.status)}</td>
        <td class="num">${tok(r.prompt_tokens)}</td>
        <td class="num">${tok(r.completion_tokens)}</td>
        <td class="num hide-sm">${tok(r.cache_read_tokens)}</td>
        <td class="num hide-sm">${r.latency_ms ? (r.latency_ms / 1000).toFixed(1) + ' วิ' : '-'}</td>
        <td class="num">${money(r.cost_thb)}</td>
      </tr>`).join('') || `<tr><td colspan="8" class="small">ไม่มีข้อมูลในช่วงนี้</td></tr>`;

  const content = `
  <section style="padding-top:22px">
    <div class="row" style="gap:8px">
      <h1 style="font-size:24px;margin:0">ประวัติการใช้งาน</h1>
      <div class="spacer"></div>
      <a class="btn sm" href="/app/usage.csv?range=${range}">ดาวน์โหลด CSV</a>
      <a class="btn sm" href="/app">แดชบอร์ด</a>
    </div>
    <p class="sub" style="margin:6px 0 10px">ทุกคำขอที่ใช้คีย์ของคุณ — นับโทเคนและค่าใช้จ่ายตามจริง (แถวที่ระบบประมาณจะติดป้าย “ประมาณ”)</p>
    <div class="row" style="margin:0 0 12px">${tabs}</div>

    <div class="readout" style="margin-top:0">
      <div class="cell"><div class="k">คำขอในช่วงที่เลือก</div><div class="v">${tok(stats.requests)}</div><div class="u">ผิดพลาด ${tok(stats.errors)} ครั้ง</div></div>
      <div class="cell"><div class="k">โทเคนรวม</div><div class="v">${tok(Number(stats.pt) + Number(stats.ct))}</div><div class="u">เข้า ${tok(stats.pt)} · ออก ${tok(stats.ct)}</div></div>
      <div class="cell"><div class="k">ค่าใช้จ่ายรวม</div><div class="v">${money(stats.cost)}</div><div class="u">จากแคช ${tok(stats.cat)} โทเคน</div></div>
      <div class="cell"><div class="k">ช่วงข้อมูล</div><div class="v" style="font-family:var(--sans);font-size:15px">${range === '7' ? '7 วันล่าสุด' : range === '30' ? '30 วันล่าสุด' : 'ทั้งหมด'}</div><div class="u">แสดง 300 รายการล่าสุด</div></div>
    </div>

    ${periods ? `<div class="panel" style="margin-top:12px">
      <div class="phead"><span class="t">สรุปรายช่วง</span><span class="r">คำขอ · ค่าใช้จ่าย</span></div>
      <div class="kv"><div class="k2">วันนี้</div><div class="v2">${tok(periods.today.requests)} ครั้ง · ${money(periods.today.cost)} · ${tok(Number(periods.today.pt) + Number(periods.today.ct))} โทเคน</div></div>
      <div class="kv"><div class="k2">สัปดาห์นี้</div><div class="v2">${tok(periods.week.requests)} ครั้ง · ${money(periods.week.cost)} · ${tok(Number(periods.week.pt) + Number(periods.week.ct))} โทเคน</div></div>
      <div class="kv"><div class="k2">เดือนนี้</div><div class="v2">${tok(periods.month.requests)} ครั้ง · ${money(periods.month.cost)} · ${tok(Number(periods.month.pt) + Number(periods.month.ct))} โทเคน</div></div>
    </div>` : ''}

    <div class="panel" style="margin-top:12px">
      <div class="phead"><span class="t">คำขอต่อวัน</span><span class="r">14 วัน</span></div>
      ${chart14(udays)}
    </div>

    <h2 style="margin-top:22px">รายการคำขอ</h2>
    <div class="rhead"><span>เวลา · โทเคน</span><span>ค่าใช้จ่าย</span><span>สถานะ</span></div>
    <div class="rows">${list}</div>
    <div class="tbl-wrap desk-only" style="margin-top:12px">
      <table class="tbl">
        <thead><tr><th>เวลา</th><th class="hide-sm">โมเดล</th><th>สถานะ</th><th class="num">เข้า</th><th class="num">ออก</th><th class="num hide-sm">จากแคช</th><th class="num hide-sm">เวลาตอบ</th><th class="num">ค่าใช้จ่าย</th></tr></thead>
        <tbody>${trs}</tbody>
      </table>
    </div>
    <p class="small" style="margin-top:10px">แสดง 300 รายการล่าสุด · ดูทั้งหมดได้ในไฟล์ CSV · <a href="/docs#error" style="color:var(--accent)">ความหมายของสถานะ</a></p>
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
    ['429', 'เรียกใช้งานถี่เกิน 30 คำขอต่อนาที', 'รอตาม Retry-After แล้วลองใหม่'],
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
      <div class="item"><div class="l"><div class="t">รหัสคำขอและการลองใหม่</div><div class="m">ทุกคำตอบมี header <span class="mono">X-Request-Id</span> ใช้อ้างอิงกับฝ่ายบริการ · เมื่อถูกจำกัดอัตราจะมี <span class="mono">Retry-After</span> เป็นวินาที</div></div></div>
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
    <p class="sub" style="margin:4px 0 0">สรุปข้อมูลที่ระบบจัดเก็บ วิธีใช้ และสิทธิ์ของคุณ · อัปเดต 14 พฤศจิกายน 2026</p>

    <div class="card" style="margin-top:14px">
      <h2 style="font-size:17px;margin:0">ข้อมูลที่จัดเก็บ</h2>
      <div class="list" style="margin-top:10px">
        <div class="item"><div class="l"><div class="t">บัญชี</div><div class="m">อีเมลและชื่อจากบัญชี Google · รหัสผู้ใช้ Google · สถานะบัญชี</div></div></div>
        <div class="item"><div class="l"><div class="t">คีย์ API</div><div class="m">เก็บเป็นค่าแฮช SHA-256 พร้อมชื่อ คำนำหน้า และเวลาใช้งานล่าสุด — ไม่เก็บคีย์ตัวจริง</div></div></div>
        <div class="item"><div class="l"><div class="t">การใช้งาน</div><div class="m">เวลา โมเดล จำนวนโทเคน (ขาเข้า ขาออก จากแคช) สถานะ ค่าใช้จ่าย เวลาตอบ หมายเลขคำขอ (request id) และ IP ของผู้เรียก</div></div></div>
        <div class="item"><div class="l"><div class="t">การเงิน</div><div class="m">คำสั่งซื้อ แผน ยอดเงิน เครดิต และบันทึกการเติม ปรับ หรือหักเครดิต</div></div></div>
        <div class="item"><div class="l"><div class="t">ข้อความที่คุณกรอกเอง</div><div class="m">หมายเหตุในคำสั่งซื้อ (เช่น เลขอ้างอิงสลิป) และเหตุผลการปรับเครดิตโดยเจ้าหน้าที่</div></div></div>
        <div class="item"><div class="l"><div class="t">ข้อความช่วยเหลือ</div><div class="m">หัวข้อ ข้อความ อีเมลติดต่อ IP และคำตอบของเจ้าหน้าที่ (จากแบบฟอร์มหน้า /help)</div></div></div>
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

export function statusPage({ dbOk, dbMs, model, prices, payReady, baseUrl, upstream, uptime = 0, user = null, stats = null }) {
  const checked = dt(new Date());
  const content = `
  <section style="padding-top:26px">
    <div class="row" style="gap:8px">
      <div>
        <div class="eyebrow"><i style="background:${dbOk ? 'var(--ok)' : 'var(--err)'}"></i>${dbOk ? 'ระบบทำงานปกติ' : 'ระบบบางส่วนขัดข้อง'} · ตรวจล่าสุด ${checked}</div>
        <h1 style="font-size:24px;margin:6px 0 0">สถานะระบบ</h1>
      </div>
      <div class="spacer"></div>
      <a class="btn sm" href="/health">ผลตรวจ JSON</a>
    </div>

    <div class="readout">
      <div class="cell"><div class="k">ฐานข้อมูล</div><div class="v" style="font-family:var(--sans);font-size:16px">${dbOk ? 'ปกติ' : 'ขัดข้อง'}</div><div class="u">ตอบใน ${dbMs} ms</div></div>
      <div class="cell"><div class="k">โมเดลที่ให้บริการ</div><div class="v" style="font-family:var(--sans);font-size:16px">${upstream ? 'พร้อมใช้' : 'ยังไม่พร้อม'}</div><div class="u mono">${esc(model)}</div></div>
      <div class="cell"><div class="k">ราคาต่อ 1M โทเคน</div><div class="v">฿${thb(prices.in, 2)}<small> เข้า</small></div><div class="u">ออก ฿${thb(prices.out, 2)} · แคช ฿${thb(prices.cacheRead, 2)}</div></div>
      <div class="cell"><div class="k">อัปไตม์</div><div class="v" style="font-family:var(--sans);font-size:16px">${fmtUptime(uptime)}</div><div class="u">ตั้งแต่เริ่มโปรเซส</div></div>
    </div>

    <h2 style="margin-top:22px">การใช้งานระบบ</h2>
    <p class="sub">ตัวเลขจริงจากฐานข้อมูล · อัปเดตทุก 30 วินาที</p>
    ${statsPanel(stats)}

    <h2 style="margin-top:22px">รายละเอียด</h2>
    <div class="rows">
      <div class="r" style="grid-template-columns:1fr auto">
        <div><div class="tm">การเชื่อมต่อฐานข้อมูล</div><div class="md">ตรวจด้วยคำสั่ง SELECT 1 ทุกครั้งที่โหลดหน้านี้</div></div>
        <div>${dbOk ? '<span class="status s-ok">ปกติ</span>' : '<span class="status s-err">ขัดข้อง</span>'}</div>
      </div>
      <div class="r" style="grid-template-columns:1fr auto">
        <div><div class="tm">บริการโมเดล</div><div class="md">${esc(baseUrl)}/v1 · ${esc(model)}</div></div>
        <div>${upstream ? '<span class="status s-ok">ตั้งค่าแล้ว</span>' : '<span class="status s-warn">ยังไม่พร้อม</span>'}</div>
      </div>
      <div class="r" style="grid-template-columns:1fr auto">
        <div><div class="tm">การรับชำระเงิน</div><div class="md">PromptPay QR · เจ้าหน้าที่ตรวจสอบก่อนเติมเครดิต</div></div>
        <div>${payReady ? '<span class="status s-ok">เปิดรับ</span>' : '<span class="status s-warn">ยังไม่เปิด</span>'}</div>
      </div>
    </div>

    ${dbOk ? '' : '<div class="warnbox" style="margin-top:16px">ขณะนี้ระบบบางส่วนขัดข้อง คำขอที่ล้มเหลวจะไม่ถูกหักเครดิต กรุณาลองใหม่ภายหลัง หรือ <a href="/help">แจ้งฝ่ายบริการลูกค้า</a></div>'}
    <p class="small" style="margin-top:14px">หน้านี้แสดงเฉพาะสถานะที่ตรวจได้จากระบบ · หากพบปัญหาที่ไม่แสดงที่นี่ กรุณาแจ้งพร้อมเลขอ้างอิงคำขอ (ถ้ามี) · <a href="/help" style="color:var(--accent)">ศูนย์ช่วยเหลือ</a> · <a href="/docs" style="color:var(--accent)">เอกสาร API</a> · <a href="/pricing" style="color:var(--accent)">ราคา</a></p>
  </section>`;
  return layout({ title: 'สถานะระบบ — JapexisKey', content, user, active: 'stats' });
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
