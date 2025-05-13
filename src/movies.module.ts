import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SwapiService } from './infrastructure/movies/swapi.service';
import { GetAllMovieUseCase } from './application/use-cases/movies/getAll-movie.usecase';
import { MoviesController } from './interface/controllers/movies.controller';
import { SharedModule } from './shared.module';
import { Agent } from 'https';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      httpsAgent: new Agent({
        rejectUnauthorized: false,
      }),
    }),
    SharedModule,
  ],
  providers: [
    SwapiService,
    GetAllMovieUseCase,
    {
      provide: 'IMovieServices',
      useClass: SwapiService,
    },
  ],
  controllers: [MoviesController],
  exports: [GetAllMovieUseCase],
})
export class MoviesModule {}
