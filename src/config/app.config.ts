import {join} from 'path';
import {base64ToStr} from '../app/helpers/utils.helper';

export const appConfig = {
  walletPath: join(process.cwd(), 'wallet'),
  gminerConfigPath: join(process.cwd(), 'gminer/gminer.conf'),
  appEnv: process.env.APP_ENV,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  hmacSecretKey: process.env.HMAC_SECRET_KEY,
  walletApiUrl: process.env.WALLET_API_URL,
  walletTlsPrivateKey: base64ToStr(process.env.WALLET_TLS_PRIVATE_KEY),
  walletTlsCertificate: base64ToStr(process.env.WALLET_TLS_CERTIFICATE),
  walletMacaroonHex: process.env.WALLET_MACAROON_HEX,
  explorerApiUrl: process.env.EXPLORER_API_URL,
  defaultAddress: process.env.DEFAULT_ADDRESS,
  appUrl: process.env.APP_URL,
  defaultTokenExpiration: 3600,
  defaultHmacExpiration: 5000,
  serverPort: parseInt(process.env.SERVER_PORT || '3000'),
  apiBasePath: '/api/v1',
  logging: true
};
