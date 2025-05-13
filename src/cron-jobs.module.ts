import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SyncMoviesJobUseCase } from './application/use-cases/crons/syncMovies-job.usecase';
import { DailyMovieJobService } from './infrastructure/jobs/dailyMovieJob.service';
import { SharedModule } from './shared.module';
import { MongoDBModule } from './mongodb.module';
import { MovieServiceImpl } from './infrastructure/database/movie.service';

@Module({
  imports: [ScheduleModule.forRoot(), SharedModule, MongoDBModule],
  providers: [
    DailyMovieJobService,
    SyncMoviesJobUseCase,
    MovieServiceImpl,
    {
      provide: 'IMovieRepository',
      useClass: MovieServiceImpl,
    },
  ],
})
export class CronJobsModule {}
