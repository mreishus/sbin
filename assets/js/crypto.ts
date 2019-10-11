import pbkdf2 from "pbkdf2";
import aesjs from "aes-js";
import base64js from "base64-js";

/*
   General flow:
   ====
   If you want to encrypt, give us a message and a password.
   You will get back an encrypted message and also a salt. 
   Save the salt.

   To decrypt, provide the same password, the same salt, and the
   encrypted message.  You will get the original message back.

   The encrypted message, password, and salt are all strings for
   ease of use.

    // Encrypt
    const { key, salt } = await keyFromPassword("my password");
    const encryptedContentB64 = encrypt(inputs.content, key);
    // Make sure to save the salt with the encryptedContentB64

    // Decrypted
    const key = await keyFromPasswordSalt("my password", salt);
    const decrypted = decrypt(encryptedContentB64, key);
 */

// Given a password, make a random salt and a key.
const keyFromPassword = async (password: string) => {
  const salt = makeRandomSalt();
  const derivedKey = await keyFromPasswordSalt(password, salt);
  return { key: derivedKey, salt: salt };
};

// Given a password and a salt, make a key.
const keyFromPasswordSalt = async (password: string, salt: string) => {
  const derivedKey = pbkdf2.pbkdf2Sync(password, salt, 1, 32, "sha512");
  return derivedKey;
};

// Given a message and a key, return an encrypted message (base64 string).
const encrypt = (message: string, key: Buffer) => {
  // Convert text to bytes
  const textBytes = aesjs.utils.utf8.toBytes(message);

  const aesCtr = new aesjs.ModeOfOperation.ctr(key);
  const encryptedBytes = aesCtr.encrypt(textBytes);

  return base64js.fromByteArray(encryptedBytes);
};

// Given an encrypted message and a key, return a decrypted message.
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
