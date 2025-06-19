import {FastifyDynamicSwaggerOptions} from '@fastify/swagger';
import {FastifySwaggerUiOptions} from '@fastify/swagger-ui';
import {appConfig} from './app.config';

const swaggerConfig = {
  mode: 'dynamic',
  openapi: {
    info: {
      title: 'Flokicoin Faucets',
      description: 'API documentation for Flokicoin Faucets',
      version: '0.1.0'
    },
    host: `0.0.0.0:${appConfig.serverPort}`,
    servers: [{description: `${appConfig.appEnv}`, url: appConfig.appUrl}],
    components: {
      securitySchemes: {
        apiKey: {
          description: 'Authorization header token, sample: Bearer #TOKEN',
          type: 'apiKey',
          name: 'Authorization',
          in: 'header'
        }
      }
    },
    security: [
      {
        apiKey: []
      }
    ],
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      {name: 'Default', description: 'App related endpoints'},
      {name: 'Account', description: 'Account related endpoints'},
      {name: 'Game', description: 'Game related endpoints'},
      {name: 'Transaction', description: 'Transaction related endpoints'}
    ]
  },
  hideUntagged: false
} as FastifyDynamicSwaggerOptions;

const swaggerUIConfig: FastifySwaggerUiOptions = {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: true,
    defaultModelExpandDepth: 0,
    defaultModelRendering: 'model',
    persistAuthorization: true
  },
  uiHooks: {
    onRequest(_request, _reply, next) {
      next();
    },
    preHandler(_request, _reply, next) {
      next();
    }
  },
  staticCSP: true,
  transformStaticCSP: header => header,
  transformSpecification: swaggerObject => swaggerObject,
  transformSpecificationClone: true
};

export {swaggerConfig, swaggerUIConfig};
