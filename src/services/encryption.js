const CryptoJS = require('crypto-js');
const config = require('../config/environment');

const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, config.encryption.key).toString();
};

const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, config.encryption.key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = { encrypt, decrypt };
