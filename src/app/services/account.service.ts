import {Service} from 'typedi';
import {appConfig} from '../../config/app.config';
import {HttpClient} from '../core/clients/http.client';
import {EntityErrors, TechnicalErrors} from '../core/errors';
import {truncateToDecimals} from '../helpers/utils.helper';
import {TAccount} from '../schemas/account.schema';
import {AbstractRepository} from './abstract_repository.service';

@Service()
export class AccountService extends AbstractRepository<TAccount> {
  private readonly explorerClient: HttpClient;
  constructor() {
    super('account');
    this.explorerClient = new HttpClient(appConfig.explorerApiUrl);
  }

  async connectAccount(address: string) {
    try {
      let accountInfo = await this.repository.findOneBy({address});
      if (!accountInfo) {
        await this.insert({address});
        accountInfo = await this.findOne({address});
      }
      accountInfo.balance = await this.getBalance(address);
      return accountInfo;
    } catch (err) {
      throw new TechnicalErrors.InternalError(err);
    }
  }

  async getUserAccount(address: string) {
    try {
      const account = await this.findOne({address});
      account.balance = await this.getBalance(address);
      return account;
    } catch (err) {
      throw new EntityErrors.ItemNotFoundError(err).withParams(address);
    }
  }

  async getBalance(address: string) {
    try {
      const {chain_stats} = await this.explorerClient.request(`/address/${address}`);
      const balance = truncateToDecimals(chain_stats?.funded_txo_sum / 100000000);
      return balance;
    } catch (err) {
      throw new TechnicalErrors.InternalError(err);
    }
  }
}
