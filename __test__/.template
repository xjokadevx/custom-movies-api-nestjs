import { Test, TestingModule } from '@nestjs/testing';

import { SharedModule } from '../src/shared.module';
import { AuthController } from '../src/interface/controllers/auth.controller';
import { LoginUserUseCase } from '../src/application/use-cases/user/login-user.usecase';
import { JWTCustomModule } from '../src/jwt.module';
import { UserModule } from '../src/user.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserSchema,
} from '../src/infrastructure/database/schemas/user.schema';

describe('AppController', () => {
  let authController: AuthController;
  let mongoServer: MongoMemoryServer;
  let app: TestingModule;

  beforeEach(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    app = await Test.createTestingModule({
      imports: [
        SharedModule,
        JWTCustomModule,
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
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
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(authController.health()).toBe('Hello World!');
    });
  });

  afterAll(async () => {
    await app.close();
    await mongoServer.stop();
  });
});
