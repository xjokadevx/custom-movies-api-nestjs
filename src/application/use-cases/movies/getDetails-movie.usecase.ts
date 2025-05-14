import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IMovieRepository } from '../../../domain/repositories/movie.repository';
import { MovieServiceImpl } from '../../../infrastructure/database/movie.service';
import { CustomLogger } from '../../../shared/logger/logger.service';

@Injectable()
export class GetDetailsMovieUseCase {
  constructor(
    private readonly logger: CustomLogger,
    @Inject(MovieServiceImpl)
    private readonly movieService: IMovieRepository,
  ) {}

  async execute(episodeId: string) {
    this.logger.log('Get movie details', GetDetailsMovieUseCase.name);
    const result = await this.movieService.getMovieByEpisodeId(episodeId);
    if (!result) {
      throw new BadRequestException('Movie not found');
    }
    return result;
  }
}
