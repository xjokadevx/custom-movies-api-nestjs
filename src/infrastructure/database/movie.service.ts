import { MovieEntity } from 'src/domain/models/movie.entity';
import { IMovieRepository } from 'src/domain/repositories/movie.repository';
import { Movie, MovieDocument } from './schemas/movie.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MovieMapper } from './mappers/movieApi.mapper';
import { CustomLogger } from 'src/shared/logger/logger.service';

export class MovieServiceImpl implements IMovieRepository {
  constructor(
    @InjectModel(Movie.name)
    private readonly movieModel: Model<MovieDocument>,
    private readonly logger: CustomLogger,
  ) {}
  async saveMovies(
    movies: MovieEntity[],
  ): Promise<{ data: string; result: boolean }> {
    try {
      const moviesToSave = movies.map((movie) => MovieMapper.toSaveDoc(movie));
      const result = await this.movieModel.insertMany(moviesToSave);
      if (!result) {
        return {
          data: 'Error creating movie',
          result: false,
        };
      }
      return {
        data: 'Movies created',
        result: true,
      };
    } catch (error) {
      console.error('Error creating movie', error);
      this.logger.error('Error creating movie', error, MovieServiceImpl.name);
      return {
        data: 'Error creating movie',
        result: false,
      };
    }
  }
  async save(movie: MovieEntity): Promise<{ data: string; result: boolean }> {
    try {
      const result = await this.movieModel.create(MovieMapper.toSaveDoc(movie));
      if (!result) {
        return {
          data: 'Error creating movie',
          result: false,
        };
      }
      return {
        data: result._id as string,
        result: true,
      };
    } catch (error) {
      console.error('Error creating movie', error);
      this.logger.error('Error creating movie', error, MovieServiceImpl.name);
      return {
        data: 'Error creating movie',
        result: false,
      };
    }
  }
  getAllMovies(): Promise<MovieEntity[]> {
    throw new Error('Method not implemented.');
  }
  getMovieByEpisodeId(id: string): Promise<MovieEntity> {
    console.info(id);
    throw new Error('Method not implemented.');
  }
  updateMovie(id: string, movie: MovieEntity): Promise<MovieEntity> {
    console.info(id, movie);
    throw new Error('Method not implemented.');
  }
  deleteMovie(id: string): Promise<{ data: string; result: boolean }> {
    console.info(id);
    throw new Error('Method not implemented.');
  }
}
