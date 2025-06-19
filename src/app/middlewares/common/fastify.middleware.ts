import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyJwt from '@fastify/jwt';
import Fastify, {FastifyInstance} from 'fastify';
import {Service} from 'typedi';
import {appConfig} from '../../../config/app.config';
import {logger} from '../../core/logger';
import ControllersPlugin from '../../core/plugins/controllers.plugin';
import SchemasPlugin from '../../core/plugins/schemas.plugin';
import SwaggerPlugin from '../../core/plugins/swagger.plugin';
import {customErrorHandler} from '../custom/custom_error.middleware';
import {requestIdMiddleware} from '../custom/request_id.middleware';
import {requestTrackingMiddleware} from '../custom/request_tracking.middleware';

@Service()
export class FastifyMiddleware {
  private app: FastifyInstance;

  constructor() {
    this.app = Fastify({logger: appConfig.logging});
    this.setupMiddleware();
    this.setupPlugins();
    this.setupErrorHandler();
  }

  private async setupMiddleware() {
    this.app.register(fastifyCors, {
      origin: appConfig.appUrl,
      credentials: true
    });
    this.app.register(fastifyHelmet);
    this.app.register(fastifyCookie);
    this.app.register(fastifyJwt, {
      namespace: 'default',
      secret: {
        public: appConfig.jwtSecretKey
      },
      sign: {
        algorithm: 'HS256'
      },
      verify: {
        algorithms: ['HS256']
      }
    });

    this.app.addHook('onRequest', requestIdMiddleware);
    this.app.addHook('preHandler', requestTrackingMiddleware);
  }

  private setupPlugins() {
    this.app.register(SwaggerPlugin);
    this.app.register(SchemasPlugin);
    this.app.register(ControllersPlugin);
  }

  private setupErrorHandler() {
    customErrorHandler(this.app);
  }

  public start(port?: number) {
    return new Promise(resolve => {
      this.app.listen({port: port || appConfig.serverPort, host: '0.0.0.0'}, async (err, address) => {
        if (err) {
          logger.error('[ APPLICATION ] : ❌ Failed to start', err);
          process.exit(1);
        }
        logger.info(`[ APPLICATION ] : ✅ App started at ${address}`);
        console.log(this.app.printRoutes());
        await this.app.ready();
        this.app.swagger();
        resolve(true);
      });
    });
  }

  public async stop() {
    try {
      await this.app.close();
      logger.info('[ APPLICATION ] : ❎ App stopped');
    } catch (err) {
      logger.error('[ APPLICATION ] : ❌ Error while stopping the app', err);
      process.exit(1);
    }
  }
}
