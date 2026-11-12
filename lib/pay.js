// PromptPay QR payload (EMVCo) + QR rendering
import crypto from 'node:crypto';
import QRCode from 'qrcode';

function tlv(tag, value) {
  const v = String(value);
  const len = v.length;
  return `${tag}${String(len).padStart(2, '0')}${v}`;
}

function crc16(payload) {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

/**
 * Build a PromptPay (Thai QR) payload.
 * id = 10-digit mobile number (0xxxxxxxxx) or 13-digit citizen id
 * amount = baht, e.g. 10.00
 */
export function promptPayPayload(idRaw, amount, ref = '') {
  const digits = String(idRaw || '').replace(/[^0-9]/g, '');
  let merchant;
  if (digits.length === 13) {
    merchant = tlv('00', 'A000000677010111') + tlv('02', digits);
  } else if (digits.length === 10 && digits.startsWith('0')) {
    merchant = tlv('00', 'A000000677010111') + tlv('01', '0066' + digits.slice(1));
  } else {
    throw new Error('promptpay id ไม่ถูกต้อง (ต้องเป็นเบอร์มือถือ 10 หลัก หรือเลขบัตร 13 หลัก)');
  }

  let payload = '';
  payload += tlv('00', '01');
  payload += tlv('01', '12'); // dynamic QR (one time)
  payload += tlv('29', merchant);
  payload += tlv('53', '764'); // THB
  if (amount && Number(amount) > 0) {
    payload += tlv('54', Number(amount).toFixed(2));
  }
  payload += tlv('58', 'TH');
  if (ref) {
    payload += tlv('62', tlv('07', String(ref).slice(0, 20)));
  }
  payload += '6304';
  payload += crc16(payload);
  return payload;
}

export async function qrSvg(text, size = 240) {
  return QRCode.toString(text, {
    type: 'svg',
    margin: 1,
    width: size,
    errorCorrectionLevel: 'M',
    color: { dark: '#0b1220', light: '#ffffff' },
  });
}

export function randomRef() {
  return crypto.randomBytes(4).toString('hex').toUpperCase().slice(0, 6);
}
