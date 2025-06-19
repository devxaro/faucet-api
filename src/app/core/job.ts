import {CronJob} from 'cron';
import {Container, Service} from 'typedi';
import {jobConfig} from '../../config/job.config';
import {TechnicalErrors} from '../core/errors';
import {CacheService} from '../services/cache.service';
import {GameService} from '../services/game.service';
import {TransactionService} from '../services/transaction.service';
import {JobType} from './enums';

@Service()
export class Job {
  jobConfigs;

  constructor(private cacheService: CacheService) {
    this.jobConfigs = {
      [JobType.CleanGamesJob]: new CronJob(jobConfig.cleanOldGames, this.cleanGamesJobHandler),
      [JobType.MineBlockJob]: new CronJob(jobConfig.mineBlock, this.mineBlockJobHandler)
    };
  }

  start() {
    this.jobConfigs[JobType.CleanGamesJob].start();
    this.setNextExecution(JobType.CleanGamesJob);

    this.jobConfigs[JobType.MineBlockJob].start();
    this.setNextExecution(JobType.MineBlockJob);
  }

  private setNextExecution(jobName: string) {
    const job = this.jobConfigs[jobName];
    const nextExecution = job.nextDate().toMillis();
    const ttl = nextExecution - Date.now() + 10000;
    this.cacheService.set(jobName, nextExecution, ttl / 1000);
  }

  private cleanGamesJobHandler = async () => {
    try {
      const gameService: any = Container.get(GameService);
      await gameService.cleanOldGames();
    } catch (err) {
      throw new TechnicalErrors.JobError(err).withParams(JobType.CleanGamesJob);
    } finally {
      this.setNextExecution(JobType.CleanGamesJob);
    }
  };

  private mineBlockJobHandler = async () => {
    try {
      const transactionService: any = Container.get(TransactionService);
      await transactionService.mineBlock();
    } catch (err) {
      throw new TechnicalErrors.JobError(err).withParams(JobType.MineBlockJob);
    } finally {
      this.setNextExecution(JobType.MineBlockJob);
    }
  };
}
