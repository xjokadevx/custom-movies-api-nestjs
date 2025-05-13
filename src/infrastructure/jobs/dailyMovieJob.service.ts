import { Injectable } from '@nestjs/common';
import { SwapiService } from 'src/infrastructure/movies/swapi.service';
import { CustomLogger } from 'src/shared/logger/logger.service';
import { MovieServiceImpl } from '../database/movie.service';

@Injectable()
export class DailyMovieJobService {
  constructor(
    private readonly logger: CustomLogger,
    private readonly swapiService: SwapiService,
    private readonly movieService: MovieServiceImpl,
  ) {}

  async execute() {
    try {
      this.logger.log('Syncing movies', DailyMovieJobService.name);
      let page: string = '1';
      do {
        const resultService = await this.swapiService.getAllMovies(page);
        if (!resultService) {
          break;
        }
        const resultSaved = await this.movieService.saveMovies(
          resultService.results,
        );
        if (!resultSaved.result) {
          this.logger.error('Error saving movies', resultSaved.data);
          break;
        }
        this.logger.log(
          `Movies saved page: ${page}`,
          DailyMovieJobService.name,
        );
        page = resultService.next !== null ? `${Number(page) + 1}` : '';
      } while (page !== '');
      this.logger.log('Movies synced', DailyMovieJobService.name);
    } catch (error) {
      console.error('Error syncing movies', error);
      this.logger.error(
        'Error syncing movies',
        error,
        DailyMovieJobService.name,
      );
    }
  }
}
