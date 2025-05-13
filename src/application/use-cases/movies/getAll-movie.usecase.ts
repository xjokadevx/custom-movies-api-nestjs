import { Inject, Injectable } from '@nestjs/common';
import { IMovieRepository } from 'src/domain/repositories/movie.repository';
import { MovieServiceImpl } from 'src/infrastructure/database/movie.service';
import { CustomLogger } from 'src/shared/logger/logger.service';

@Injectable()
export class GetAllMovieUseCase {
  constructor(
    private readonly logger: CustomLogger,
    @Inject(MovieServiceImpl)
    private readonly movieService: IMovieRepository,
  ) {}

  async execute() {
    this.logger.log('Get all movies', GetAllMovieUseCase.name);
    const result = await this.movieService.getAllMovies();
    return {
      result: true,
      data: result.data,
    };
  }
}
