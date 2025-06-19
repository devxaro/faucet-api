import {Service} from 'typedi';
import {appConfig} from '../../config/app.config';
import {TechnicalErrors} from '../core/errors';
import {addToBigInt} from '../helpers/utils.helper';
import {TGame} from '../schemas/game.schema';
import {AbstractRepository} from './abstract_repository.service';
import {AccountService} from './account.service';

@Service()
export class GameService extends AbstractRepository<TGame> {
  constructor(private accountService: AccountService) {
    super('game');
  }

  async processGame(data: TGame, address: string) {
    try {
      const account = await this.accountService.findOne({address});
      const game = {...data, account: {id: account.id}};
      account.pendingBalance = addToBigInt(account.pendingBalance, data.score);
      await this.accountService.upsert(account, ['address']);
      await this.insert(game);
    } catch (err) {
      throw new TechnicalErrors.InternalError(err);
    }
  }

  async getWinners() {
    try {
      const winners = [];
      const query = this.repository
        .createQueryBuilder('game')
        .innerJoinAndSelect('game.account', 'account')
        .select(['account.id', 'account.address', 'MAX(game.score) as highScore'])
        .where('account.address != :excludedAddress', {excludedAddress: appConfig.defaultAddress})
        .groupBy('account.id')
        .orderBy('highScore', 'DESC')
        .limit(10);

      const results = await query.getRawMany();

      results.map((result, index) =>
        winners.push({
          position: index + 1,
          id: result.account_id,
          score: result.highScore,
          address: result.account_address
        })
      );

      return {docs: winners, count: winners.length};
    } catch (err) {
      throw new TechnicalErrors.InternalError(err);
    }
  }

  async cleanOldGames() {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      await this.repository.createQueryBuilder().delete().from('game').where('createdAt < :today', {today}).execute();
    } catch (err) {
      throw new TechnicalErrors.InternalError(err);
    }
  }
}
