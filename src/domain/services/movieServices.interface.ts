export interface IMovieServices {
  getAllMovies(page: string): Promise<any>;
  getMovieById(id: string): Promise<any>;
  createMovie(movie: any): Promise<any>;
  updateMovie(id: string, movie: any): Promise<any>;
  deleteMovie(id: string): Promise<any>;
}
