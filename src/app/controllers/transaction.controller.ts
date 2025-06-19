import {FastifyReply, FastifyRequest} from 'fastify';
import {Controller, GET} from 'fastify-decorators';
import {getTransactionsRoute} from '../../config/routes.config';
import {QueryParamsModel} from '../models/query_params.model';
import {TransactionService} from '../services/transaction.service';

@Controller('/transactions')
export class TransactionController {
  constructor(private transactionsService: TransactionService) {}

  @GET(getTransactionsRoute)
  async getTransactions({query, user}: FastifyRequest, reply: FastifyReply) {
    const userInfo: any = user;
    const result = await this.transactionsService.getUserTransactions(query as QueryParamsModel, userInfo.uid);
    reply.send(result);
  }
}
