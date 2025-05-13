import { Module } from '@nestjs/common';
import { GetAllMovieUseCase } from './application/use-cases/movies/getAll-movie.usecase';
import { MoviesController } from './interface/controllers/movies.controller';
import { SharedModule } from './shared.module';
import { MongoDBModule } from './mongodb.module';

@Module({
  imports: [SharedModule, MongoDBModule],
  providers: [GetAllMovieUseCase],
  controllers: [MoviesController],
  exports: [GetAllMovieUseCase],
})
export class MoviesModule {}
