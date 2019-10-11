import pbkdf2 from "pbkdf2";
import aesjs from "aes-js";
import base64js from "base64-js";

const keyFromPassword = async (password: string) => {
  const salt = makeRandomSalt();
  const derivedKey = await keyFromPasswordSalt(password, salt);
  return { key: derivedKey, salt: salt };
};

const keyFromPasswordSalt = async (password: string, salt: string) => {
  const derivedKey = pbkdf2.pbkdf2Sync(password, salt, 1, 32, "sha512");
  return derivedKey;
};

const encrypt = (message: string, key: Buffer) => {
  // Convert text to bytes
  const textBytes = aesjs.utils.utf8.toBytes(message);

  // The counter is optional, and if omitted will begin at 1
  const aesCtr = new aesjs.ModeOfOperation.ctr(key);
  const encryptedBytes = aesCtr.encrypt(textBytes);
  //return encryptedBytes;

  //const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  //return encryptedHex;

  return base64js.fromByteArray(encryptedBytes);
};

const decrypt = (message: string, key: Buffer) => {
  const encryptedBytes = base64js.toByteArray(message);

  const aesCtr = new aesjs.ModeOfOperation.ctr(key);
  const decryptedBytes = aesCtr.decrypt(encryptedBytes);

  const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  return decryptedText;
};

const makeRandomSalt = () => {
  const len = 16;
  const byteArray = new Uint8Array(len);
  window.crypto.getRandomValues(byteArray);
  return base64js.fromByteArray(byteArray);
};

export { keyFromPassword, keyFromPasswordSalt, encrypt, decrypt };
