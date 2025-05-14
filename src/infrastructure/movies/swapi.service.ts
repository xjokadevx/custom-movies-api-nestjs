import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IMovieServices } from './../../domain/services/movieServices.interface';
import { CustomLogger } from '../../shared/logger/logger.service';
import { EnvConfig } from '../../shared/config/env';
import { ISwapiResponse } from './swapi-response.interface';
import { AxiosError } from 'axios';

@Injectable()
export class SwapiService implements IMovieServices {
  SWAPI_URL = '';
  constructor(
    private readonly httpService: HttpService,
    private readonly logger: CustomLogger,
    private readonly env: EnvConfig,
  ) {
    this.SWAPI_URL = this.env.swapiUrl as string;
  }
  async getAllMovies(page: string): Promise<ISwapiResponse> {
    try {
      this.logger.log('Getting movies', SwapiService.name);
      const result = await this.httpService.axiosRef.get<ISwapiResponse>(
        `${this.SWAPI_URL}/films?=page=${page}`,
      );
      if (!result || result.status !== 200) {
        throw new NotFoundException('Error getting movies');
      }
      return result.data;
    } catch (error: unknown) {
      const err = error as AxiosError;
      this.logger.error(
        `Error getting movies: ${err.message}`,
        err.stack,
        SwapiService.name,
      );
      throw new InternalServerErrorException('Swapi error');
    }
  }
  getMovieById(id: string): Promise<any> {
    console.info(id);
    throw new Error('Method not implemented.');
  }
  createMovie(movie: any): Promise<any> {
    console.info(movie);
    throw new Error('Method not implemented.');
  }
  updateMovie(id: string, movie: any): Promise<any> {
    console.info(id, movie);
    throw new Error('Method not implemented.');
  }
  deleteMovie(id: string): Promise<any> {
    console.info(id);
    throw new Error('Method not implemented.');
  }
}
