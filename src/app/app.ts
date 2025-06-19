import {Service} from 'typedi';
import {Database} from './core/database/index';
import {Job} from './core/job';
import {FastifyMiddleware} from './middlewares/common/fastify.middleware';

@Service()
export class App {
  constructor(
    private database: Database,
    private fastify: FastifyMiddleware,
    private job: Job
  ) {}

  async bootstrap(port?: number) {
    await this.database.start();
    await this.fastify.start(port);
    this.job.start();
  }

  async stop() {
    this.fastify.stop();
  }
}
