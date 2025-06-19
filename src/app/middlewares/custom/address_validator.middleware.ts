import {FastifyRequest} from 'fastify';
import {address, networks} from 'flokicoinjs-lib';
import {AccountErrors} from '../../core/errors';

export const addressValidatorMiddleware = () => {
  return async ({params}: FastifyRequest) => {
    try {
      address.toOutputScript(params['addr'], networks.testnet);
    } catch (err) {
      throw new AccountErrors.InvalidAddressError(err);
    }
  };
};
