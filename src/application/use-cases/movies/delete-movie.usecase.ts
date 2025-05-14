import { Inject, Injectable } from '@nestjs/common';
import { IMovieRepository } from '../../../domain/repositories/movie.repository';
import { MovieServiceImpl } from '../../../infrastructure/database/movie.service';
import { CustomLogger } from '../../../shared/logger/logger.service';

@Injectable()
export class DeleteMovieUseCase {
  constructor(
    private readonly logger: CustomLogger,
    @Inject(MovieServiceImpl)
    private readonly movieService: IMovieRepository,
  ) {}

  async execute(
    episode_id: string,
  ): Promise<{ data: string; result: boolean }> {
    this.logger.log('Get all movies', DeleteMovieUseCase.name);
    const result = await this.movieService.deleteMovieByEpisodeId(episode_id);
    return {
      result: true,
      data: result.data,
    };
  }
}
