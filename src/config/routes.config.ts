import {addressValidatorMiddleware} from '../app/middlewares/custom/address_validator.middleware';
import {authenticationMiddleware} from '../app/middlewares/custom/authentication.middleware';
import {queryParamsValidatorMiddleware} from '../app/middlewares/custom/query_params_validator.middleware';
import {signatureValidatorMiddleware} from '../app/middlewares/custom/signature_validator.middleware';
import {defaultErrors} from './errors.config';
import {$ref} from './schemas.config';

export const getPingRoute = {
  url: '/ping',
  method: 'GET',
  options: {
    onRequest: [],
    schema: {
      description: 'Ping the server to check if it is up and running',
      tags: ['Default'],
      response: {
        200: {
          description: 'Server is up and running',
          content: {
            'application/json': {schema: $ref('PingSchema')}
          }
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {schema: $ref('CustomErrorSchema')}
          }
        }
      }
    }
  }
};

export const getAppConfigRoute = {
  url: '/config',
  method: 'GET',
  options: {
    onRequest: [],
    schema: {
      description: 'Get app config',
      tags: ['Default'],
      response: {
        200: {
          description: 'App config retrieved successfully',
          content: {
            'application/json': {schema: $ref('AppConfigSchema')}
          }
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {schema: $ref('CustomErrorSchema')}
          }
        }
      }
    }
  }
};

export const connectAccountRoute = {
  url: '/:addr/connect',
  method: 'GET',
  options: {
    onRequest: [addressValidatorMiddleware()],
    schema: {
      description: 'Connect account by address',
      tags: ['Account'],
      response: {
        200: {
          description: 'Account connected successfully',
          content: {
            'application/json': {schema: $ref('AccountSchema')}
          }
        },
        ...defaultErrors
      }
    }
  }
};

export const getConnectedAccountRoute = {
  url: '/',
  method: 'GET',
  options: {
    onRequest: [authenticationMiddleware()],
    schema: {
      description: 'Get connected account',
      tags: ['Account'],
      response: {
        200: {
          description: 'Account retrieved successfully',
          content: {
            'application/json': {schema: $ref('AccountSchema')}
          }
        },
        ...defaultErrors
      }
    }
  }
};

export const processGameRoute = {
  url: '/',
  method: 'POST',
  options: {
    onRequest: [authenticationMiddleware()],
    preHandler: [signatureValidatorMiddleware()],
    schema: {
      description: 'Process game result',
      tags: ['Game'],
      body: $ref('GameSchema'),
      response: {
        201: {
          description: 'Game result processed successfully',
          type: 'null'
        },
        ...defaultErrors
      }
    }
  }
};

export const getWinnersRoute = {
  url: '/winners',
  method: 'GET',
  options: {
    onRequest: [],
    schema: {
      description: 'Get winners',
      tags: ['Game'],
      response: {
        200: {
          description: 'Winners retrieved successfully',
          content: {
            'application/json': {schema: $ref('DocsSchema')}
          }
        },
        ...defaultErrors
      }
    }
  }
};

export const accountClaimPendingBalanceRoute = {
  url: '/claim',
  method: 'GET',
  options: {
    onRequest: [authenticationMiddleware()],
    schema: {
      description: 'Account claim balance',
      tags: ['Account'],
      response: {
        201: {
          description: 'Claim balance accepted',
          type: 'null'
        },
        ...defaultErrors
      }
    }
  }
};

export const getTransactionsRoute = {
  url: '/',
  method: 'GET',
  options: {
    onRequest: [authenticationMiddleware(), queryParamsValidatorMiddleware()],
    schema: {
      description: 'Get transactions',
      tags: ['Transaction'],
      querystring: {
        type: 'object',
        properties: {
          p: {
            type: 'number',
            description: 'The page number to return (ex: 1)'
          },
          l: {
            type: 'number',
            description: 'The number of records per page (ex: 100)'
          },
          s: {
            type: 'string',
            description: 'The sort criteria (ex: amount:asc)'
          },
          f: {
            type: 'string',
            description: 'The filter criteria (ex: txHash:e:0x... )'
          }
        },
        required: []
      },
      response: {
        200: {
          description: 'Transactions retrieved successfully',
          content: {
            'application/json': {schema: $ref('DocsSchema')}
          }
        },
        ...defaultErrors
      }
    }
  }
};
