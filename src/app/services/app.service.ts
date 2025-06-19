import {Service} from 'typedi';
import {JobType} from '../core/enums';
import {TechnicalErrors} from '../core/errors';
import {CacheService} from './cache.service';

@Service()
export class AppService {
  constructor(private cacheService: CacheService) {}

  getConfig() {
    try {
      const config = {
        jobs: [{name: JobType.MineBlockJob, timeout: this.cacheService.getTtl(JobType.MineBlockJob)}]
      };
      return config;
    } catch (err) {
      throw new TechnicalErrors.InternalError(err);
    }
  }
}
