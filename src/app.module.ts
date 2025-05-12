import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

import { AuthController } from './interface/controllers/auth.controller';
import { LoginUserUseCase } from './application/use-cases/user/login-user.usecase';
import { SharedModule } from './shared.module';
import { JWTCustomModule } from './jwt.module';
import { MongoDBModule } from './mongodb.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    SharedModule,
    JWTCustomModule,
    MongoDBModule,
    UserModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 0,
          limit: 0,
        },
      ],
    }),
  ],
  controllers: [AuthController],
  providers: [LoginUserUseCase],
})
export class AppModule {}
