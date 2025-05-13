import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { GetAllMovieUseCase } from 'src/application/use-cases/movies/getAll-movie.usecase';
import { ErrorResponseDto } from '../dtos/responses/exception-response.dto';
import { GetDetailsMovieUseCase } from 'src/application/use-cases/movies/getDetails-movie.usecase';
import { MoviesResponseDto } from '../dtos/responses/movies-response.dto';
import { MovieResponseDto } from '../dtos/responses/movie-response.dto';
import { RolesGuard } from '../guards/role.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';

@ApiBearerAuth('access-token')
@ApiBadRequestResponse({
  description: 'Invalid fields',
  type: ErrorResponseDto,
})
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
  type: ErrorResponseDto,
})
@Throttle({ default: { limit: 10, ttl: 60000 } })
@Controller('api/movies')
export class MoviesController {
  constructor(
    private readonly getAllMovies: GetAllMovieUseCase,
    private readonly getDetailMovie: GetDetailsMovieUseCase,
  ) {}

  @ApiResponse({ status: 200, type: MoviesResponseDto })
  @Get()
  async getAll(): Promise<MoviesResponseDto> {
    const result = await this.getAllMovies.execute();
    if (!result.result) {
      return { results: [] };
    }
    return { results: result.data } as MoviesResponseDto;
  }

  @ApiResponse({ status: 200, type: MovieResponseDto })
  @UseGuards(RolesGuard)
  @Roles(1)
  @Get(':episode_id')
  async getMovieDetailsByEpisodeId(
    @Param('episode_id') episode_id: string,
  ): Promise<MovieResponseDto | null> {
    const result = await this.getDetailMovie.execute(episode_id);
    return result as MovieResponseDto;
  }
}
