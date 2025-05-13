import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
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
import { DeleteMovieUseCase } from 'src/application/use-cases/movies/delete-movie.usecase';
import { MovieChangedResponseDto } from '../dtos/responses/changeMovie-response.dto';
import { MovieRequestDto } from '../dtos/requests/movie-request.dto';
import { UpdateMovieUseCase } from 'src/application/use-cases/movies/update-movie.usecase';
import { SaveMovieUseCase } from 'src/application/use-cases/movies/save-movie.usecase';
import { NewMovieRequestDto } from '../dtos/requests/newMovie-request.dto';

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
    private readonly deleteMovie: DeleteMovieUseCase,
    private readonly updateMovieUseCase: UpdateMovieUseCase,
    private readonly saveMovieUseCase: SaveMovieUseCase,
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
  @Roles(2)
  @Get(':episode_id')
  async getMovieDetailsByEpisodeId(
    @Param('episode_id') episode_id: string,
  ): Promise<MovieResponseDto | null> {
    const result = await this.getDetailMovie.execute(episode_id);
    return result as MovieResponseDto;
  }

  @ApiResponse({ status: 200, type: MovieChangedResponseDto })
  @UseGuards(RolesGuard)
  @Roles(1)
  @Delete(':episode_id')
  @HttpCode(200)
  async deleteMovieByEpisodeId(
    @Param('episode_id') episode_id: string,
  ): Promise<MovieChangedResponseDto> {
    const result = await this.deleteMovie.execute(episode_id);
    return result;
  }

  @ApiResponse({ status: 200, type: MovieChangedResponseDto })
  @UseGuards(RolesGuard)
  @Roles(1)
  @Post('update/:episode_id')
  @HttpCode(200)
  async updateMovie(
    @Body() dto: MovieRequestDto,
    @Param('episode_id') episode_id: string,
  ): Promise<MovieChangedResponseDto> {
    const result = await this.updateMovieUseCase.execute(dto, episode_id);
    return result;
  }

  @ApiResponse({ status: 200, type: MovieChangedResponseDto })
  @UseGuards(RolesGuard)
  @Roles(1)
  @Post('save')
  @HttpCode(200)
  async saveMovie(
    @Body() dto: NewMovieRequestDto,
  ): Promise<MovieChangedResponseDto> {
    const result = await this.saveMovieUseCase.execute(dto);
    return result;
  }
}
