import {Service} from 'typedi';
import {appConfig} from '../../config/app.config';
import {CommandLineClient} from '../core/clients/command_line.client';
import {HttpClient} from '../core/clients/http.client';
import {AccountErrors, WalletErrors} from '../core/errors';

@Service()
export class FlcService {
  readonly cli;
  readonly walletClient: HttpClient;

  constructor() {
    this.cli = new CommandLineClient();
    this.walletClient = new HttpClient(appConfig.walletApiUrl);
    this.walletClient.setHeader('Grpc-Metadata-macaroon', appConfig.walletMacaroonHex);
    this.walletClient.setTlsAuth(appConfig.walletTlsCertificate, appConfig.walletTlsPrivateKey);
  }

  async mineBlock() {
    try {
      const result = await this.cli.runCmd('gminer', ['-c', appConfig.gminerConfigPath]);
      return result;
    } catch (err: any) {
      throw new AccountErrors.FetchAccountBalanceError(err.message);
    }
  }

  async sendTransaction(address: string, amount: number) {
    try {
      const data = {
        addr: address,
        amount: amount * 100000000,
        sat_per_vbyte: '1'
      };

      const transaction = await this.walletClient.request('/v1/transactions', {}, 'POST', data);
      return transaction;
    } catch (err: any) {
      throw new WalletErrors.SendTransactionError(err.message).withParams(address);
    }
  }
}
