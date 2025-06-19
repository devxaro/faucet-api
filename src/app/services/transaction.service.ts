import {Service} from 'typedi';
import {TxStatusType} from '../core/enums';
import {EntityErrors, TechnicalErrors} from '../core/errors';
import {QueryParamsModel} from '../models/query_params.model';
import {TTransaction} from '../schemas/transaction.schema';
import {AbstractRepository} from './abstract_repository.service';
import {AccountService} from './account.service';
import {FlcService} from './flc.service';

@Service()
export class TransactionService extends AbstractRepository<TTransaction> {
  constructor(
    private accountService: AccountService,
    private flcService: FlcService
  ) {
    super('transaction');
  }

  async getUserTransactions(query: QueryParamsModel, connectedUserAddr: string) {
    try {
      const accountInfo = await this.accountService.findOne({address: connectedUserAddr});
      const filters = [`account.id:e:${accountInfo.id}`];
      const newQuery = new QueryParamsModel({
        ...query,
        f: query.f ? [...query.f, ...filters] : filters
      });
      return await this.paginate(newQuery);
    } catch (err) {
      throw new EntityErrors.ItemsNotFoundError(err).withParams(this.repoName);
    }
  }

  async mineBlock() {
    try {
      const pendingTxs = await this.repository.find({
        where: {status: TxStatusType.Executed}
      });

      if (!pendingTxs?.length) return;
      await this.flcService.mineBlock();

      const transactions = pendingTxs.map(tx => ({...tx, status: TxStatusType.Confirmed}));
      await this.bulkUpsert(transactions, ['id']);
    } catch (err) {
      throw new TechnicalErrors.InternalError(err);
    }
  }

  async claimRewards(address: string) {
    try {
      const account = await this.accountService.findOne({address});
      const {txid} = await this.flcService.sendTransaction(account.address, account.pendingBalance);

      await this.insert({
        amount: account.pendingBalance,
        txHash: txid,
        status: TxStatusType.Executed,
        account: {id: account.id}
      });
      account.pendingBalance = 0;

      await this.accountService.repository.save(account);
    } catch (err) {
      throw new TechnicalErrors.InternalError(err);
    }
  }
}
