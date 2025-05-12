// src/infrastructure/database/mongodb.module.ts
import { Module, Global, OnModuleDestroy, Inject } from '@nestjs/common';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';
import { SharedModule } from './shared.module';
import { EncryptDecryptService } from './infrastructure/encryption/encrypt-decrypt.service';
import {
  User,
  UserSchema,
} from './infrastructure/database/schemas/user.schema';

@Global()
@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forRootAsync({
      imports: [SharedModule],
      inject: [ConfigService, EncryptDecryptService],
      useFactory: async (
        config: ConfigService,
        encryptDecryptService: EncryptDecryptService,
      ) => {
        const encryptedUri = config.get<string>('MONGO_URI');
        const encryptedDb = config.get<string>('MONGO_DB');
        const decryptedUri = await encryptDecryptService.decryptWithAES_RSA(
          encryptedUri as string,
        );
        const decryptedDb = await encryptDecryptService.decryptWithAES_RSA(
          encryptedDb as string,
        );
        return {
          uri: decryptedUri.data,
          dbName: decryptedDb.data || 'test',
        };
      },
    }),
  ],
  exports: [MongooseModule],
})
export class MongoDBModule implements OnModuleDestroy {
  constructor(
    @Inject(getConnectionToken())
    private readonly connection: Connection,
  ) {}

  async onModuleDestroy() {
    await this.connection.close();
    console.log('Mongo connection closed');
  }
}
