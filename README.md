# JapexisKey

บริการขายคีย์ API (OpenAI-compatible) ราคาเป็นบาท — โมเดลเดียว `deepseek-eco`
มีระบบเครดิต, PromptPay QR, log usage ครบ (input / output / cache read / cache write)

## Stack
- Node.js 22 + Express 4 (ไม่มี build step)
- PostgreSQL (สร้างใน Coolify)
- `pg`, `qrcode`
- หน้าเว็บ server-rendered ล้วน (ไม่มี frontend framework)

## Environment Variables
| Key | จำเป็น | คำอธิบาย |
|---|---|---|
| `DATABASE_URL` | ✅ | `postgres://user:pass@host:5432/db` (internal URL จาก Coolify) |
| `SESSION_SECRET` | ✅ | สตริงสุ่มยาว ๆ สำหรับเซ็น cookie |
| `ADMIN_TOKEN` | ✅ | รหัสเข้าหน้า `/admin` |
| `UPSTREAM_BASE_URL` | ✅ | default `https://amr-link.open-design.ai/v1` |
| `UPSTREAM_API_KEY` | ✅ | คีย์ต้นทาง (OpenDesign) — ไม่ถูกส่งให้ลูกค้า |
| `PUBLIC_BASE_URL` | ✅ | เช่น `https://key.131199999.xyz` |
| `COOKIE_SECURE` | – | `0` = ปิด Secure cookie (เฉพาะทดสอบ http) |
| `PORT` | – | default 3000 |

## Deploy (Coolify)
1. สร้าง PostgreSQL database ในโปรเจกต์เดียวกัน แล้วเอา internal URL ใส่ `DATABASE_URL`
2. สร้าง Application จาก public repo นี้, build pack = **Dockerfile**, port **3000**
3. ใส่ env ตามตาราง, ตั้ง domain, deploy
4. ครั้งแรกเปิด `/admin/login` ใส่ `ADMIN_TOKEN` → ตั้ง **เลขพร้อมเพย์** ที่ `/admin/settings`

ตารางฐานข้อมูลถูกสร้างอัตโนมัติตอนบูต (`initDb()`), seed แผน A/B/C ให้เลย

## หน้าเว็บ
| Path | ใช้ทำอะไร |
|---|---|
| `/` | หน้าแรก + แผน + ราคา |
| `/signup`, `/login` | สมัคร/เข้า (ได้คีย์ทันที) |
| `/app` | แดชบอร์ด: เครดิต, คีย์, usage ล่าสุด |
| `/app/usage` (+ `.csv`) | log ละเอียด + ดาวน์โหลด |
| `/buy` | เลือกแผน A(฿10) / B(฿20) / C(฿50) |
| `/order/:ref` | PromptPay QR + แจ้งโอน |
| `/admin` | อนุมัติออเดอร์, ผู้ใช้, usage |
| `/admin/settings` | เลขพร้อมเพย์ + ราคา/1M + rate limit |
| `/docs` | เอกสาร API (พร้อมปุ่มคัดลอก) |
| `/stats` | สถานะระบบ |

## API (OpenAI-compatible)
```bash
curl https://<domain>/v1/chat/completions \
  -H "Authorization: Bearer JXK-xxxxx" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-eco","messages":[{"role":"user","content":"สวัสดี"}]}'
```
- `GET /v1/models` — มีโมเดลเดียว
- `GET /v1/me`, `GET /v1/usage` — เครดิต + usage ของคีย์
- รองรับ `stream: true` (บังคับ `stream_options.include_usage` ให้อัตโนมัติ)
- หักเครดิตตาม usage จริงหลังจบ request; ถ้าไม่ได้ usage (สตรีมหลุด) จะประมาณและทำเครื่องหมาย `estimated`

## ราคาเริ่มต้น (บาท / 1M token)
input ฿15 · output ฿60 · cache read ฿0.50 · cache write ฿15 (แก้ได้ที่ `/admin/settings`)

ต้นทุนจริงต้นทาง (OpenDesign catalog): in $0.30 · out $1.20 · cache read $0.006 ต่อ 1M

## หมายเหตุ
- ไม่เก็บเนื้อหา prompt/คำตอบลง DB — เก็บเฉพาะ token, สถานะ, ต้นทุน
- คำขอวิ่งต่อไปยังผู้ให้บริการต้นทาง (OpenDesign) ซึ่งเห็นเนื้อหาและมี log ของเขาเอง
- การนำคีย์ของแผน personal มาต่อยอดขายต่ออาจขัดข้อกำหนดของผู้ให้บริการ — ผู้ดูแลระบบต้องรับผิดชอบเอง
