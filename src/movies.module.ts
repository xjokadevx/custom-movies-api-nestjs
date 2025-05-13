import { Module } from '@nestjs/common';
import { GetAllMovieUseCase } from './application/use-cases/movies/getAll-movie.usecase';
import { MoviesController } from './interface/controllers/movies.controller';
import { SharedModule } from './shared.module';
import { MongoDBModule } from './mongodb.module';
import { MovieServiceImpl } from './infrastructure/database/movie.service';
import { GetDetailsMovieUseCase } from './application/use-cases/movies/getDetails-movie.usecase';
import { RolesGuard } from './interface/guards/role.guard';
import { UserServiceImpl } from './infrastructure/database/user.service';

@Module({
  imports: [SharedModule, MongoDBModule],
  providers: [
    UserServiceImpl,
    RolesGuard,
    GetAllMovieUseCase,
    GetDetailsMovieUseCase,
    MovieServiceImpl,
    {
      provide: 'IMovieRepository',
      useClass: MovieServiceImpl,
    },
    {
      provide: 'IUserRepository',
      useClass: UserServiceImpl,
    },
  ],
  controllers: [MoviesController],
  exports: [GetAllMovieUseCase, GetDetailsMovieUseCase, RolesGuard],
})
export class MoviesModule {}
