import fp from 'fastify-plugin';
import {schemas} from '../../../config/schemas.config';

export default fp(async fastify => {
  for (const schema of [...schemas]) {
    fastify.addSchema(schema);
  }
});
