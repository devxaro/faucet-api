// organize-imports-ignore
import 'dotenv/config';
import 'reflect-metadata';
import './app/core/errors/catcher.error';
import {Container} from 'typedi';
import {useContainer} from '@fastify-decorators/typedi';
import {App} from './app/app';
import {logger} from './app/core/logger';

export const startServer = async (port?: number) => {
  try {
    useContainer(Container);
    const app = Container.get(App);
    await app.bootstrap(port);
    return app;
  } catch (error: any) {
    logger.error('[ APPLICATION ] : ❌ Failed to start', error);
    process.exit(1);
  }
};

export default startServer();
