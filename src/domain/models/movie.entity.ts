export class MovieEntity {
  constructor(
    public readonly title: string,
    public readonly episode_id: number,
    public readonly opening_crawl: string,
    public readonly director: string,
    public readonly producer: string,
    public readonly release_date: string,
  ) {}
}
