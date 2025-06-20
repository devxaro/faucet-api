import {Service} from 'typedi';
import {DataSource, DataSourceOptions} from 'typeorm';
import {databaseConfig} from '../../../config/database.config';
import {TechnicalErrors} from '../errors';
import {logger} from '../logger';

@Service()
export class Database {
  dataSource;
  constructor() {}

  async start() {
    try {
      databaseConfig.poolErrorHandler = async (err: any) => {
        logger.error(`[ DATABASE - POOL ERROR ] : ❌${err}`);
        await this.connectWithBackoff(databaseConfig);
      };
      await this.connectWithBackoff(databaseConfig);
    } catch (err) {
      logger.error(`[ DATABASE ] : ❌ Database connection failed`);
      process.exit(1);
    }
  }

  async connectDatabase(dbConfig: DataSourceOptions) {
    try {
      console.log('PROCESS PATH : ', process.cwd());
      this.dataSource = new DataSource(dbConfig);
      await this.dataSource.initialize();
      if (this.dataSource.isInitialized) {
        logger.info(`[ DATABASE ] : ✅ Database Connected`);
      } else {
        throw new Error('Fail to initialize database');
      }
    } catch (err: any) {
      logger.error(`[ DATABASE ] : ❌ Database connection failed : ${err.message}`);
      throw new TechnicalErrors.DatabaseError(err);
    }
  }

  async connectWithBackoff(dbConfig: DataSourceOptions, delay: number = 1000, maxRetries: number = 10) {
    try {
      await this.connectDatabase(dbConfig);
    } catch (err: any) {
      maxRetries--;
      if (maxRetries >= 0) {
        logger.warn(`[ APPLICATION ] : ⚠️ Database connection failed, retrying in ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
        await this.connectWithBackoff(dbConfig, delay * 2, maxRetries);
      } else {
        logger.error(`[ APPLICATION ] : ❌ Database connection failed after ${10} retries`);
        process.exit(1);
      }
    }
  }
}
