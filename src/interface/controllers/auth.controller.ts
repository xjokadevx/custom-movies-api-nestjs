import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginUserDto } from '../dtos/requests/login-request.dto';
import { LoginUserUseCase } from '../../application/use-cases/user/login-user.usecase';
import { Throttle } from '@nestjs/throttler';
import { AuthResponseDto } from '../dtos/responses/auth-response.dto';
import {
  ApiBadRequestResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto } from '../dtos/responses/exception-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUserUseCase) {}

  @ApiResponse({ status: 200, type: AuthResponseDto })
  @ApiBadRequestResponse({
    description: 'Invalid fields',
    type: ErrorResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: ErrorResponseDto,
  })
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('login')
  async login(@Body() dto: LoginUserDto): Promise<AuthResponseDto> {
    console.log(dto);
    const res = await this.loginUseCase.execute(dto);
    console.info(res);
    return { token: res };
  }

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('signup')
  async signup(@Body() dto: LoginUserDto): Promise<AuthResponseDto> {
    console.log(dto);
    const res = await this.loginUseCase.execute(dto);
    console.info(res);
    return { token: res };
  }

  @Get('login')
  health() {
    return 'Hello World!';
  }
}
