import {FastifyRequest} from 'fastify';
import {v4 as uuidv4} from 'uuid';

export const requestIdMiddleware = async (request: FastifyRequest) => {
  request.id = uuidv4();
};
