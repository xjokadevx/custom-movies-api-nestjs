import { IMovie } from 'src/infrastructure/movies/swapi-response.interface';
import { MovieEntity } from '../models/movie.entity';
import { MovieRequestDto } from 'src/interface/dtos/requests/movie-request.dto';
import { NewMovieRequestDto } from 'src/interface/dtos/requests/newMovie-request.dto';

export interface IMovieRepository {
  saveMovie(
    movie: NewMovieRequestDto,
  ): Promise<{ data: string; result: boolean }>;
  saveMovies(movies: IMovie[]): Promise<{ data: string; result: boolean }>;
  getAllMovies(): Promise<{ data: MovieEntity[] | []; result: boolean }>;
  getMovieByEpisodeId(episodeId: string): Promise<IMovie | null>;
  updateMovie(
    dto: MovieRequestDto,
    episode_id: string,
  ): Promise<MovieEntity | null>;
  deleteMovieByEpisodeId(
    episode_id: string,
  ): Promise<{ data: string; result: boolean }>;
}
