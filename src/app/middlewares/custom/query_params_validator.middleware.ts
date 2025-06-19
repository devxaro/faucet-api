import {FastifyRequest} from 'fastify';
import {OperationalErrors} from '../../core/errors';
import {QueryParamsModel} from '../../models/query_params.model';

export const queryParamsValidatorMiddleware = () => {
  return async (request: FastifyRequest) => {
    try {
      request.query = new QueryParamsModel(request.query);
    } catch (err) {
      throw new OperationalErrors.ValidationError(err);
    }
  };
};
