# JapexisKey

เว็บขายคีย์ API (OpenAI-compatible) ราคาเป็นบาท — โมเดลเดียว `deepseek-eco`
มีเครดิตทดลอง ฿10, PromptPay QR, log usage ครบ (input / output / cache read)

## Stack
- Node.js 22 + Express 4 (ไม่มี build step)
- PostgreSQL (สร้างใน Coolify)
- `pg`, `qrcode`
- หน้าเว็บ server-rendered ล้วน (ไม่มี frontend framework)
- Google Sign-In (OAuth 2.0) ถ้าตั้ง client id/secret

## Environment Variables
| Key | จำเป็น | คำอธิบาย |
|---|---|---|
| `DATABASE_URL` | ✅ | internal URL จาก Coolify |
| `SESSION_SECRET` | ✅ | สตริงสุ่มยาว ๆ สำหรับเซ็น cookie |
| `ADMIN_TOKEN` | ✅ | รหัสเข้าหน้า `/admin` |
| `UPSTREAM_BASE_URL` | ✅ | default `https://amr-link.open-design.ai/v1` |
| `UPSTREAM_API_KEY` | ✅ | คีย์ต้นทาง (ไม่ถูกส่งให้ลูกค้า) |
| `PUBLIC_BASE_URL` | ✅ | เช่น `https://key.131199999.xyz` |
| `GOOGLE_CLIENT_ID` | – | จาก Google Cloud Console (Web application) |
| `GOOGLE_CLIENT_SECRET` | – | คู่กับ client id |
| `GOOGLE_REDIRECT_URI` | – | default `<PUBLIC_BASE_URL>/auth/google/callback` |
| `COOKIE_SECURE` | – | `0` = ปิด Secure cookie (เฉพาะทดสอบ http) |
| `PORT` | – | default 3000 |

## Google Sign-In
1. https://console.cloud.google.com/apis/credentials → Create OAuth client ID → **Web application**
2. Authorized redirect URI: `https://<domain>/auth/google/callback`
3. OAuth consent screen: External, scopes `email`, `profile`, `openid`
4. ใส่ env `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` แล้ว redeploy

## Deploy (Coolify)
1. สร้าง PostgreSQL ในโปรเจกต์เดียวกัน → ใส่ internal URL เป็น `DATABASE_URL`
2. สร้าง Application จาก public repo นี้, build pack = **Dockerfile**, port **3000**
3. ใส่ env ตามตาราง, ตั้ง domain, deploy
4. เปิด `/admin/login` ใส่ `ADMIN_TOKEN` → ตั้งเลขพร้อมเพย์ + ราคาที่ `/admin/settings`

ตารางถูกสร้างอัตโนมัติตอนบูต (`initDb()`), seed แผน A/B/C

## หน้าเว็บ
`/` หน้าแรก · `/signup` `/login` · `/app` แดชบอร์ด · `/app/usage` (+CSV)
`/buy` แผน A(฿10)/B(฿20)/C(฿50) · `/order/:ref` QR + แจ้งโอน
`/admin` ออเดอร์/ผู้ใช้ · `/admin/settings` พร้อมเพย์+ราคา+เครดิตทดลอง
`/docs` API · `/stats` สถานะระบบ

## API (OpenAI-compatible)
```bash
curl https://<domain>/v1/chat/completions \
  -H "Authorization: Bearer JXK-xxxxx" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-eco","messages":[{"role":"user","content":"สวัสดี"}],"max_tokens":512}'
```
- `GET /v1/models`, `GET /v1/me`, `GET /v1/usage`
- รองรับ `stream: true` (บังคับ `stream_options.include_usage` ให้)
- หักเครดิตตาม usage จริงหลังจบ request; ถ้าไม่ได้ usage จะประมาณและธง `estimated`

## ราคา (บาท / 1M token)
in ฿1.50 · out ฿6.00 · cache read ฿0.03 (แก้ได้ที่ `/admin/settings`)

ต้นทุนจริงต้นทาง (OpenDesign catalog): in $0.30 · out $1.20 · cache read $0.006 ต่อ 1M — ไม่มี cache write
> ราคานี้ถูกกว่าต้นทาง ~7 เท่าโดยตั้งใจ (แบบหารกัน) — ใช้ได้ตราบที่ยังอยู่ใน allowance ของแผนต้นทาง (Go: $30/7 วัน, $5/5 ชั่วโมง) ถ้าใช้เกินต้องเติมเงินต้นทางเอง

## หมายเหตุ
- ไม่เก็บเนื้อหา prompt/คำตอบลง DB — เก็บเฉพาะ token, สถานะ, ต้นทุน
- คำขอวิ่งต่อไปยังผู้ให้บริการต้นทาง (OpenDesign) ซึ่งเห็นเนื้อหาและมี log ของเขาเอง
- การนำคีย์แผน personal มาขายต่ออาจขัดข้อกำหนดของผู้ให้บริการ — ผู้ดูแลรับความเสี่ยงเอง
