const WALLET_TLS_PRIVATE_KEY = ``;
const WALLET_TLS_CERTIFICATE = ``;
const WALLET_PASSWORD = ``;

export const strToBase64 = str => {
  return Buffer.from(str).toString('base64');
};

(() => {
  try {
    const result = {
      WALLET_PASSWORD: strToBase64(WALLET_PASSWORD),
      WALLET_TLS_PRIVATE_KEY: strToBase64(WALLET_TLS_PRIVATE_KEY),
      WALLET_TLS_CERTIFICATE: strToBase64(WALLET_TLS_CERTIFICATE)
    };

    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
})();
