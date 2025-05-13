// src/interface/controllers/pokemon.controller.ts
import { Controller, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { GetAllMovieUseCase } from 'src/application/use-cases/movies/getAll-movie.usecase';
import { ErrorResponseDto } from '../dtos/responses/exception-response.dto';

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
  constructor(private readonly getAllMovies: GetAllMovieUseCase) {}

  @Get()
  async getAll() {
    return this.getAllMovies.execute();
  }
}
