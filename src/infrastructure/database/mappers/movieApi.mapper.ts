import { MovieEntity } from 'src/domain/models/movie.entity';
import { MovieDocument } from '../schemas/movie.schema';

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
  static toSaveDoc(movie: MovieEntity): Partial<MovieDocument> {
    return {
      title: movie.title,
      episode_id: movie.episode_id,
      opening_crawl: movie.opening_crawl,
      director: movie.director,
      producer: movie.producer,
      release_date: movie.release_date,
    };
  }
}
