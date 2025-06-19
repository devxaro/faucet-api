import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import {TechnicalErrors} from '../../core/errors';
import {BaseError} from '../../core/errors/base.error';
import {logger} from '../../core/logger';
import {buildErrorObject} from '../../helpers/error.helper';

export const customErrorHandler = (app: FastifyInstance) => {
  app.setErrorHandler(async (error: any, request: FastifyRequest, reply: FastifyReply) => {
    if (!(error instanceof BaseError)) {
      error = new TechnicalErrors.InternalError(error, true);
    }

    error.addTip('supportId', request.id);

    if (error.isInternalError === true) {
      const errorData = {
        id: request.id,
        status: error.status,
        message: error.toString(),
        code: error.errorCode,
        reason: error.stack,
        route: request.routeOptions.url,
        verb: request.method
      };
      logger.error(errorData);
    }

    const resError = buildErrorObject(error.errorCode, error.message, error.tips);
    if (request.raw.headers['accept']?.includes('text/event-stream') || request.body?.['stream']) {
      const serializedError = JSON.stringify(resError);

      reply.raw.writeHead(error.status || error.httpCode || 500, {
        'Content-Type': 'text/event-stream'
      });

      reply.raw.write(`event: error\ndata: ${serializedError}\n\n`);
      reply.raw.end();
    } else {
      reply.status(error.status || error.httpCode || 500).send(resError);
    }
  });
};
