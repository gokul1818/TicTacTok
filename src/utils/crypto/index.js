import { ENCRYPTION_KEY } from "@env";
import CryptoJS from "crypto-js";

export const encryption = async (data, callback) => {
  let body = data;

  if (body) {
    const encryptedData = CryptoJS.AES.encrypt(body, ENCRYPTION_KEY).toString();
    Boolean(callback) && callback(encryptedData);
    return encryptedData;
  }
};

export const decryption = async (data, callback) => {
  let body = data;
  if (body) {
    let decryptBody = CryptoJS.AES.decrypt(body, ENCRYPTION_KEY).toString(
      CryptoJS.enc.Utf8
    );
    const cryptbody = JSON.parse(decryptBody);
    Boolean(callback) && callback(cryptbody);
    return cryptbody;
  }
};
