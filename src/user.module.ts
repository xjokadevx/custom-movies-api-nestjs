import { Module } from '@nestjs/common';
import { SignUpUseCase } from './application/use-cases/user/signup-user.usecase';
import { UserImplementation } from './infrastructure/database/user.implementation';
import { MongoDBModule } from './mongodb.module';
import { JWTCustomModule } from './jwt.module';

@Module({
  imports: [MongoDBModule, JWTCustomModule],
  providers: [
    UserImplementation,
    SignUpUseCase,
    {
      provide: 'IUserRepository',
      useClass: UserImplementation,
    },
  ],
  exports: [SignUpUseCase],
})
export class UserModule {}
