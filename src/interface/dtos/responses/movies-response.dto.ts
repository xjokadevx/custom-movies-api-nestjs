import { ApiResponseProperty } from '@nestjs/swagger';
import { MovieResponseDto } from './movie-response.dto';

export class MoviesResponseDto {
  @ApiResponseProperty({ type: [MovieResponseDto] })
  results: MovieResponseDto[] | [];
}
