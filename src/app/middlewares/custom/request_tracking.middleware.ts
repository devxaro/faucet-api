import {FastifyRequest} from 'fastify';
import {logger} from '../../core/logger';

export const requestTrackingMiddleware = async (request: FastifyRequest) => {
  if (request.body && request.method === 'POST') {
    const logData = {
      id: request.id,
      body: request.body,
      route: request.routeOptions.url,
      verb: request.method
    };
    logger.info(logData);
  }
};
