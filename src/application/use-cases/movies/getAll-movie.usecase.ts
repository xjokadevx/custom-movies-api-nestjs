import { Injectable } from '@nestjs/common';
import { SwapiService } from 'src/infrastructure/movies/swapi.service';
import { CustomLogger } from 'src/shared/logger/logger.service';

@Injectable()
export class GetAllMovieUseCase {
  constructor(
    private readonly logger: CustomLogger,
    private readonly swapiService: SwapiService,
  ) {}

  async execute() {
    this.logger.log('Get all movies', GetAllMovieUseCase.name);
    const resultService = await this.swapiService.getAllMovies();
    return {
      result: true,
      data: resultService.results,
    };
  }
}
