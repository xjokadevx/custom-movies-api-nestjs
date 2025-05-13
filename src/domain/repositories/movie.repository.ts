import { IMovie } from 'src/infrastructure/movies/swapi-response.interface';
import { MovieEntity } from '../models/movie.entity';

export interface IMovieRepository {
  save(movie: MovieEntity): Promise<{ data: string; result: boolean }>;
  saveMovies(movies: IMovie[]): Promise<{ data: string; result: boolean }>;
  getAllMovies(): Promise<{ data: MovieEntity[] | []; result: boolean }>;
  getMovieByEpisodeId(episodeId: string, userId: string): Promise<MovieEntity>;
  updateMovie(id: string, movie: MovieEntity): Promise<MovieEntity>;
  deleteMovie(id: string): Promise<{ data: string; result: boolean }>;
}
