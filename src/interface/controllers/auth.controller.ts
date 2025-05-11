import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginUserDto } from '../../application/dto/login-user.dto';
import { LoginUserUseCase } from '../../application/use-cases/user/login-user.usecase';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUserUseCase) {}

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
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
