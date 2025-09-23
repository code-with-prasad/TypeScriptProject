import CryptoJS from "crypto-js";

const SECRET = import.meta.env.VITE_AES_SECRET || "test_secret";

export function encrypt(text: string): string {
  return CryptoJS.AES.encrypt(text, SECRET).toString();
}

export function decrypt(cipher: string): string {
  const bytes = CryptoJS.AES.decrypt(cipher, SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
}
// Deterministic encryption (for email)
export function deterministicEncrypt(text: string): string {
  const iv = CryptoJS.enc.Utf8.parse("1234567890123456"); 
  const key = CryptoJS.enc.Utf8.parse(SECRET.padEnd(16, "0").slice(0, 16));
  const encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.toString();
}

// Use the same for deterministic decryption
export function deterministicDecrypt(cipher: string): string {
  const iv = CryptoJS.enc.Utf8.parse("1234567890123456");
  const key = CryptoJS.enc.Utf8.parse(SECRET.padEnd(16, "0").slice(0, 16));
  const decrypted = CryptoJS.AES.decrypt(cipher, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
