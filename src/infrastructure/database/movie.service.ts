import { MovieEntity } from 'src/domain/models/movie.entity';
import { IMovieRepository } from 'src/domain/repositories/movie.repository';
import { Movie, MovieDocument } from './schemas/movie.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MovieMapper } from './mappers/movieApi.mapper';
import { CustomLogger } from 'src/shared/logger/logger.service';
import { IMovie } from '../movies/swapi-response.interface';
import { MovieRequestDto } from 'src/interface/dtos/requests/movie-request.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { NewMovieRequestDto } from 'src/interface/dtos/requests/newMovie-request.dto';

export class MovieServiceImpl implements IMovieRepository {
  constructor(
    @InjectModel(Movie.name)
    private readonly movieModel: Model<MovieDocument>,
    private readonly logger: CustomLogger,
  ) {}
  async saveMovies(
    movies: IMovie[],
  ): Promise<{ data: string; result: boolean }> {
    try {
      const moviesToSave = movies.map((movie) => MovieMapper.toSaveDoc(movie));
      const result = await this.movieModel.insertMany(moviesToSave, {
        ordered: false,
      });
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
  async saveMovie(
    movie: NewMovieRequestDto,
  ): Promise<{ data: string; result: boolean }> {
    try {
      const result = await this.movieModel.create(MovieMapper.toSaveDoc(movie));
      console.info(result);
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
  async getAllMovies(): Promise<{ data: MovieEntity[] | []; result: boolean }> {
    try {
      const result = await this.movieModel.find();
      if (!result) {
        return {
          data: [],
          result: false,
        };
      }
      const moviesToDomain = result.map((movie) => MovieMapper.toDomain(movie));
      return {
        data: moviesToDomain as MovieEntity[],
        result: true,
      };
    } catch (error) {
      console.error('Error getting movies', error);
      this.logger.error('Error getting movies', error, MovieServiceImpl.name);
      return {
        data: [],
        result: false,
      };
    }
  }
  async getMovieByEpisodeId(episode_id: string): Promise<IMovie | null> {
    this.logger.log(
      'Get movie by episode id: ' + episode_id,
      MovieServiceImpl.name,
    );
    const result = await this.movieModel.findOne({ episode_id });
    if (!result) {
      return null;
    }
    return MovieMapper.toMovieDetails(result);
  }
  async updateMovie(
    dto: MovieRequestDto,
    episode_id: string,
  ): Promise<MovieEntity | null> {
    try {
      this.logger.log(
        'Updating movie by episode id: ' + episode_id,
        MovieServiceImpl.name,
      );
      const result = await this.movieModel.findOneAndUpdate(
        { episode_id },
        dto,
      );
      console.log('result :>> ', result);
      if (!result) {
        return null;
      }
      return MovieMapper.toDomain(result);
    } catch (error) {
      console.error('Error updating movie', error);
      this.logger.error('Error updating movie', error, MovieServiceImpl.name);
      throw new InternalServerErrorException('Error updating movie');
    }
  }

  async deleteMovieByEpisodeId(
    episode_id: string,
  ): Promise<{ data: string; result: boolean }> {
    this.logger.log(
      'Deleting movie by episode id: ' + episode_id,
      MovieServiceImpl.name,
    );
    try {
      const result = await this.movieModel.deleteOne({ episode_id });
      if (!result) {
        return {
          data: 'Error deleting movie',
          result: false,
        };
      }
      if (result.deletedCount === 0) {
        return {
          data: 'Movie not found',
          result: false,
        };
      }
      return {
        data: 'Movie deleted',
        result: true,
      };
    } catch (error) {
      this.logger.error('Error deleting movie', error, MovieServiceImpl.name);
      return {
        data: 'Error deleting movie',
        result: false,
      };
    }
  }
}
