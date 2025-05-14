import { Inject, Injectable } from '@nestjs/common';
import { IMovieRepository } from '../../../domain/repositories/movie.repository';
import { MovieServiceImpl } from '../../../infrastructure/database/movie.service';
import { MovieRequestDto } from '../../../interface/dtos/requests/movie-request.dto';
import { CustomLogger } from '../../../shared/logger/logger.service';

@Injectable()
export class UpdateMovieUseCase {
  constructor(
    private readonly logger: CustomLogger,
    @Inject(MovieServiceImpl)
    private readonly movieService: IMovieRepository,
  ) {}

  async execute(
    dto: MovieRequestDto,
    episode_id: string,
  ): Promise<{ data: string; result: boolean }> {
    this.logger.log('Updating movie', UpdateMovieUseCase.name);
    const result = await this.movieService.updateMovie(dto, episode_id);
    if (!result) {
      return {
        result: false,
        data: 'Movie not updated or not found',
      };
    }
    return {
      result: true,
      data: 'Movie updated',
    };
  }
}
