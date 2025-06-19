import {buildJsonSchemas} from 'fastify-zod';
import {AccountSchema} from '../app/schemas/account.schema';
import {AppConfigSchema} from '../app/schemas/app_config.schema';
import {DocsSchema} from '../app/schemas/docs.schema';
import {CustomErrorSchema} from '../app/schemas/error.schema';
import {GameSchema} from '../app/schemas/game.schema';
import {PingSchema} from '../app/schemas/ping.schema';
import {TransactionSchema} from '../app/schemas/transaction.schema';

export const {schemas, $ref} = buildJsonSchemas({
  AccountSchema,
  TransactionSchema,
  CustomErrorSchema,
  PingSchema,
  DocsSchema,
  GameSchema,
  AppConfigSchema
});
