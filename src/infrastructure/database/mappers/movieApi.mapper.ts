import { MovieEntity } from '../../../domain/models/movie.entity';
import { MovieDocument } from '../schemas/movie.schema';
import { IMovie } from 'src/infrastructure/movies/swapi-response.interface';
import { NewMovieRequestDto } from 'src/interface/dtos/requests/newMovie-request.dto';

export class MovieMapper {
  static toDomain(doc: MovieDocument): MovieEntity | null {
    if (!doc) return null;
    return new MovieEntity(
      doc.title,
      doc.episode_id,
      doc.opening_crawl,
      doc.director,
      doc.producer,
      doc.release_date,
    );
  }
  static toSaveDoc(movie: IMovie | NewMovieRequestDto): Partial<MovieDocument> {
    return {
      title: movie.title,
      episode_id: movie.episode_id,
      opening_crawl: movie.opening_crawl,
      director: movie.director,
      producer: movie.producer,
      release_date: movie.release_date,
      characters: movie.characters,
      planets: movie.planets,
      starships: movie.starships,
      vehicles: movie.vehicles,
      species: movie.species,
      created: movie.created,
      edited: movie.edited,
      url: movie.url,
    };
  }
  static toMovieDetails(doc: MovieDocument): IMovie | null {
    if (!doc) return null;
    return {
      title: doc.title,
      episode_id: doc.episode_id,
      opening_crawl: doc.opening_crawl,
      director: doc.director,
      producer: doc.producer,
      release_date: doc.release_date,
      characters: doc.characters,
      planets: doc.planets,
      starships: doc.starships,
      vehicles: doc.vehicles,
      species: doc.species,
      created: doc.created,
      edited: doc.edited,
      url: doc.url,
    };
  }
}
