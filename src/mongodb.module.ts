// src/infrastructure/database/mongodb.module.ts
import {
  Module,
  Global,
  OnModuleDestroy,
  Inject,
  OnApplicationBootstrap,
  InternalServerErrorException,
} from '@nestjs/common';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';
import { SharedModule } from './shared.module';
import { EncryptDecryptService } from './infrastructure/encryption/encrypt-decrypt.service';
import {
  User,
  UserSchema,
} from './infrastructure/database/schemas/user.schema';
import {
  Movie,
  MovieSchema,
} from './infrastructure/database/schemas/movie.schema';

@Global()
@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {
        name: Movie.name,
        schema: MovieSchema,
      },
    ]),
    MongooseModule.forRootAsync({
      imports: [SharedModule],
      inject: [ConfigService, EncryptDecryptService],
      useFactory: (
        config: ConfigService,
        encryptDecryptService: EncryptDecryptService,
      ) => {
        try {
          const encryptedUri = config.get<string>('MONGO_URI');
          const encryptedDb = config.get<string>('MONGO_DB');
          const decryptedUri = encryptDecryptService.decryptWithAES_RSA(
            encryptedUri as string,
          );
          const decryptedDb = encryptDecryptService.decryptWithAES_RSA(
            encryptedDb as string,
          );
          return {
            uri: decryptedUri.data,
            dbName: decryptedDb.data || 'test',
          };
        } catch (error) {
          console.error('Error mongodb connection', error);
          throw new InternalServerErrorException('Service unavailable');
        }
      },
    }),
  ],
  exports: [MongooseModule],
})
export class MongoDBModule implements OnModuleDestroy, OnApplicationBootstrap {
  constructor(
    @Inject(getConnectionToken())
    private readonly connection: Connection,
  ) {}
  onApplicationBootstrap() {
    console.log('Mongo connection opened');
  }

  async onModuleDestroy() {
    await this.connection.close();
    console.log('Mongo connection closed');
  }
}
