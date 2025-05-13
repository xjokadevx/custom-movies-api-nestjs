import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

import { AuthController } from './interface/controllers/auth.controller';
import { SharedModule } from './shared.module';
import { UserModule } from './user.module';
import { MoviesModule } from './movies.module';

@Module({
  imports: [
    SharedModule,
    UserModule,
    MoviesModule,
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
})
export class AppModule {}
