import { ApiResponseProperty } from '@nestjs/swagger';

export class MovieResponseDto {
  @ApiResponseProperty()
  title: string;
  @ApiResponseProperty()
  episode_id: number;
  @ApiResponseProperty()
  opening_crawl: string;
  @ApiResponseProperty()
  director: string;
  @ApiResponseProperty()
  producer: string;
  @ApiResponseProperty()
  release_date: string;
  @ApiResponseProperty()
  characters: string[];
  @ApiResponseProperty()
  planets: string[];
  @ApiResponseProperty()
  starships: string[];
  @ApiResponseProperty()
  vehicles: string[];
  @ApiResponseProperty()
  species: string[];
  @ApiResponseProperty()
  created: string;
  @ApiResponseProperty()
  edited: string;
  @ApiResponseProperty()
  url: string;
}
