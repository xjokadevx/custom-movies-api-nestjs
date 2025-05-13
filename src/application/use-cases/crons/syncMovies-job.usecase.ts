import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DailyMovieJobService } from 'src/infrastructure/jobs/dailyMovieJob.service';

@Injectable()
export class SyncMoviesJobUseCase {
  constructor(private readonly moviesJob: DailyMovieJobService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    await this.moviesJob.execute();
  }
}
