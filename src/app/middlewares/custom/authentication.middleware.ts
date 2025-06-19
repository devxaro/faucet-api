import {FastifyRequest} from 'fastify';
import {SecurityErrors} from '../../core/errors';
import {verifyJwtToken} from '../../helpers/token.helper';

export const authenticationMiddleware = () => {
  return async (request: FastifyRequest) => {
    try {
      await verifyJwtToken(request);
    } catch (err) {
      throw new SecurityErrors.InvalidTokenError(err);
    }
  };
};
