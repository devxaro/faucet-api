import {FastifyRequest} from 'fastify';
import {appConfig} from '../../../config/app.config';
import {SecurityErrors} from '../../core/errors';
import {isTimestampValid, validateSignature} from '../../helpers/utils.helper';

export const signatureValidatorMiddleware = () => {
  return async ({query, body}: FastifyRequest<{Body: Record<string, any>}>) => {
    try {
      const {signature, timestamp}: any = query;
      if (!signature) throw new Error('Missing signature');
      if (!isTimestampValid(timestamp, appConfig.defaultHmacExpiration)) {
        throw new Error('Timestamp is out of allowed range');
      }

      const bodyStr = JSON.stringify({...body, timestamp});
      validateSignature(bodyStr, signature, appConfig.hmacSecretKey);
    } catch (err) {
      throw new SecurityErrors.InvalidSignatureError(err);
    }
  };
};
