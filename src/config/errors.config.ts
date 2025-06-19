import {$ref} from './schemas.config';

export const defaultErrors = {
  401: {
    description: 'Unauthorized access',
    content: {
      'application/json': {schema: $ref('CustomErrorSchema')}
    }
  },
  403: {
    description: 'Forbidden access',
    content: {
      'application/json': {schema: $ref('CustomErrorSchema')}
    }
  },
  500: {
    description: 'Internal server error',
    content: {
      'application/json': {schema: $ref('CustomErrorSchema')}
    }
  }
};
