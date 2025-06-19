import Swagger from '@fastify/swagger';
import {fastifySwaggerUi} from '@fastify/swagger-ui';
import fp from 'fastify-plugin';
import {swaggerConfig, swaggerUIConfig} from '../../../config/swagger.config';

export default fp(async fastify => {
  fastify.register(Swagger, swaggerConfig);
  fastify.register(fastifySwaggerUi, swaggerUIConfig);
});
