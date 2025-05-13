import { Module } from '@nestjs/common';
import { SignUpUseCase } from './application/use-cases/user/signup-user.usecase';
import { UserServiceImpl } from './infrastructure/database/user.service';
import { MongoDBModule } from './mongodb.module';
import { JWTCustomModule } from './jwt.module';
import { LoginUserUseCase } from './application/use-cases/user/login-user.usecase';

@Module({
  imports: [MongoDBModule, JWTCustomModule],
  providers: [
    UserServiceImpl,
    SignUpUseCase,
    LoginUserUseCase,
    {
      provide: 'IUserRepository',
      useClass: UserServiceImpl,
    },
  ],
  exports: [SignUpUseCase, LoginUserUseCase],
})
export class UserModule {}
