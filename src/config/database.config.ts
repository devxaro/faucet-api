import {Account} from '../app/core/database/entities/account.entity';
import {Game} from '../app/core/database/entities/game.entity';
import {Transaction} from '../app/core/database/entities/transaction.entity';
import {CleanerSubscriber} from '../app/core/database/subscribers/cleaner.subscriber';
import {TimeStampSubscriber} from '../app/core/database/subscribers/timestamp.subscriber';
import {appConfig} from './app.config';

export const databaseConfig: any = {
  type: 'sqlite',
  synchronize: true,
  database: 'database.sqlite',
  logging: appConfig.logging,
  cache: {
    duration: 30000
  },
  entities: [Account, Transaction, Game],
  subscribers: [TimeStampSubscriber, CleanerSubscriber]
};
