import {FastifyReply, FastifyRequest} from 'fastify';
import {Controller, GET} from 'fastify-decorators';
import {appConfig} from '../../config/app.config';
import {accountClaimPendingBalanceRoute, connectAccountRoute, getConnectedAccountRoute} from '../../config/routes.config';
import {RolesType} from '../core/enums';
import {generateToken} from '../helpers/token.helper';
import {AccountService} from '../services/account.service';
import {TransactionService} from '../services/transaction.service';

@Controller('/accounts')
export class AccountController {
  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService
  ) {}

  @GET(connectAccountRoute)
  async connect({params}: FastifyRequest, reply: FastifyReply) {
    const address = params['addr'];
    const account = await this.accountService.connectAccount(address);
    const token = generateToken(address, [RolesType.User], appConfig.defaultTokenExpiration);

    reply
      .setCookie('access_token', token, {
        maxAge: appConfig.defaultTokenExpiration,
        sameSite: 'strict',
        httpOnly: false,
        path: '/'
      })
      .send(account);
  }

  @GET(getConnectedAccountRoute)
  async getConnectedAccount({user}: FastifyRequest, reply: FastifyReply) {
    const userInfo: any = user;
    const account = await this.accountService.getUserAccount(userInfo.uid);
    reply.send(account);
  }

  @GET(accountClaimPendingBalanceRoute)
  async claimPendingBalance({user}: FastifyRequest, reply: FastifyReply) {
    const userInfo: any = user;
    await this.transactionService.claimRewards(userInfo.uid);
    reply.status(201).send();
  }
}
