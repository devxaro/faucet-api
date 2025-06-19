import {bootstrap} from 'fastify-decorators';
import fp from 'fastify-plugin';
import {appConfig} from '../../../config/app.config';
import {AccountController} from '../../controllers/account.controller';
import {AppController} from '../../controllers/app.controller';
import {GameController} from '../../controllers/game.controller';
import {TransactionController} from '../../controllers/transaction.controller';

export default fp(async fastify => {
  fastify.register(bootstrap, {
    controllers: [AccountController, TransactionController, AppController, GameController],
    prefix: appConfig.apiBasePath
  });
});
