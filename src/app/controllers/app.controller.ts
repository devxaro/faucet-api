import {FastifyReply, FastifyRequest} from 'fastify';
import {Controller, GET} from 'fastify-decorators';
import {getAppConfigRoute, getPingRoute} from '../../config/routes.config';
import {AppService} from '../services/app.service';

@Controller('/app')
export class AppController {
  constructor(private appService: AppService) {}

  @GET(getPingRoute)
  async ping(request: FastifyRequest, reply: FastifyReply) {
    reply.status(200).send({message: 'pong'});
  }

  @GET(getAppConfigRoute)
  getConfig(_: FastifyRequest, reply: FastifyReply) {
    const config = this.appService.getConfig();
    reply.send(config);
  }
}
