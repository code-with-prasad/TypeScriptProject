// src/utils/crypto.ts
import CryptoJS from "crypto-js";

const key = import.meta.env.VITE_CRYPTO_KEY || "default_secret_key";

export const encrypt = (data: object): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
};

export const decrypt = <T>(cipherText: string): T | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted) as T;
  } catch (err) {
    console.error("Decryption failed:", err);
    return null;
  }
};
