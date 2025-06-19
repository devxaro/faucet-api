import {FastifyReply, FastifyRequest} from 'fastify';
import {Controller, GET, POST} from 'fastify-decorators';
import {getWinnersRoute, processGameRoute} from '../../config/routes.config';
import {GameService} from '../services/game.service';

@Controller('/games')
export class GameController {
  constructor(private gameService: GameService) {}

  @POST(processGameRoute)
  async processGame({body, user}: FastifyRequest, reply: FastifyReply) {
    const userInfo: any = user;
    await this.gameService.processGame(body, userInfo.uid);
    reply.status(201).send();
  }

  @GET(getWinnersRoute)
  async getWinners(_: FastifyRequest, reply: FastifyReply) {
    const winners = await this.gameService.getWinners();
    reply.send(winners);
  }
}
