import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Matches } from 'class-validator';

export class NewMovieRequestDto {
  @ApiProperty({
    description: 'title of the movie',
    required: true,
    default: 'test',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'episode id of the movie',
    required: true,
    default: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  episode_id: number;

  @ApiProperty({
    description: 'sinopsis of the movie',
    required: true,
    default: 'test',
  })
  @IsNotEmpty()
  opening_crawl: string;

  @ApiProperty({
    description: 'director of the movie',
    required: true,
    default: 'test',
  })
  @IsNotEmpty()
  director: string;

  @ApiProperty({
    description: 'producer of the movie',
    required: true,
    default: 'test',
  })
  @IsNotEmpty()
  producer: string;

  @ApiProperty({
    description: 'release date of the movie',
    required: false,
    default: 'test',
  })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Release date must be in the format YYYY-MM-DD.',
  })
  release_date: string;

  @ApiProperty({
    description: 'characters of the movie',
    required: false,
    default: ['test'],
  })
  characters: string[];

  @ApiProperty({
    description: 'planets of the movie',
    required: false,
    default: ['test'],
  })
  planets: string[];

  @ApiProperty({
    description: 'starships of the movie',
    required: false,
    default: ['test'],
  })
  starships: string[];

  @ApiProperty({
    description: 'vehicles of the movie',
    required: false,
    default: ['test'],
  })
  vehicles: string[];

  @ApiProperty({
    description: 'species of the movie',
    required: false,
    default: ['test'],
  })
  species: string[];

  @ApiProperty({
    description: 'created of the movie',
    required: false,
    default: 'test',
  })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Created date must be in the format YYYY-MM-DD.',
  })
  created: string;

  @ApiProperty({
    description: 'edited of the movie',
    required: false,
    default: 'test',
  })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Edited date must be in the format YYYY-MM-DD.',
  })
  edited: string;

  @ApiProperty({
    description: 'url of the movie',
    required: false,
    default: 'test',
  })
  url: string;
}
