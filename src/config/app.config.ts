import {resolve} from 'path';
import {readFile, readFileHex} from '../app/helpers/utils.helper';

const walletTlsCertPath = resolve(process.cwd(), '../volumes/wallet/tls.cert');
const walletTlsKeyPath = resolve(process.cwd(), '../volumes/wallet/tls.key');

const [walletTlsCertificate, walletTlsPrivateKey] = await Promise.all([readFile(walletTlsCertPath), readFile(walletTlsKeyPath)]);

const walletMacaroonPath = resolve(process.cwd(), '../volumes/wallet/data/chain/flokicoin/test/admin.macaroon');
const walletMacaroonHex = await readFileHex(walletMacaroonPath);

export const appConfig = {
  gminerConfigPath: resolve(process.cwd(), '../volumes/gminer/gminer.conf'),
  gminerPath: resolve(process.cwd(), '../volumes/gminer/gminer'),
  databasePath: resolve(process.cwd(), '../volumes/database/database.sqlite'),
  appEnv: process.env.APP_ENV,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  hmacSecretKey: process.env.HMAC_SECRET_KEY,
  walletApiUrl: process.env.WALLET_API_URL,
  walletTlsPrivateKey,
  walletTlsCertificate,
  walletMacaroonHex,
  explorerApiUrl: process.env.EXPLORER_API_URL,
  defaultAddress: process.env.DEFAULT_ADDRESS,
  appUrl: process.env.APP_URL,
  defaultTokenExpiration: 3600,
  defaultHmacExpiration: 5000,
  serverPort: parseInt(process.env.SERVER_PORT || '3000'),
  apiBasePath: '/api/v1',
  logging: true
};
