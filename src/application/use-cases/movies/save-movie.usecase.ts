import { Inject, Injectable } from '@nestjs/common';
import { IMovieRepository } from '../../../domain/repositories/movie.repository';
import { MovieServiceImpl } from '../../../infrastructure/database/movie.service';

import { NewMovieRequestDto } from '../../../interface/dtos/requests/newMovie-request.dto';
import { CustomLogger } from '../../../shared/logger/logger.service';

@Injectable()
export class SaveMovieUseCase {
  constructor(
    private readonly logger: CustomLogger,
    @Inject(MovieServiceImpl)
    private readonly movieService: IMovieRepository,
  ) {}

  async execute(
    dto: NewMovieRequestDto,
  ): Promise<{ data: string; result: boolean }> {
    this.logger.log('Updating movie', SaveMovieUseCase.name);
    const result = await this.movieService.saveMovie(dto);
    if (!result.result) {
      return {
        result: false,
        data: 'Movie not registered or already exists. Please validate.',
      };
    }
    return {
      result: true,
      data: 'Movie registered',
    };
  }
}
