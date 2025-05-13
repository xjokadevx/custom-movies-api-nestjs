import { Module } from '@nestjs/common';
import { GetAllMovieUseCase } from './application/use-cases/movies/getAll-movie.usecase';
import { MoviesController } from './interface/controllers/movies.controller';
import { SharedModule } from './shared.module';
import { MongoDBModule } from './mongodb.module';
import { MovieServiceImpl } from './infrastructure/database/movie.service';

@Module({
  imports: [SharedModule, MongoDBModule],
  providers: [
    GetAllMovieUseCase,
    MovieServiceImpl,
    {
      provide: 'IMovieRepository',
      useClass: MovieServiceImpl,
    },
  ],
  controllers: [MoviesController],
  exports: [GetAllMovieUseCase],
})
export class MoviesModule {}
