import { Injectable } from '@nestjs/common';
import * as forge from 'node-forge';

import { IGenericResult } from '../../domain/interfaces/genericResult.interface';
import constants from '../../shared/config/constants';
import { IEncryptServiceInterface } from 'src/domain/services/encrypt.service.interface';
import { EnvConfig } from '../../shared/config/env';

@Injectable()
export class EncryptDecryptService implements IEncryptServiceInterface {
  AES_KEY = '';
  constructor(private readonly env: EnvConfig) {
    const result_aeskey = this.decryptWithRSA(env.aesSecret as string);
    if (!result_aeskey) throw new Error('AES_KEY not found');
    this.AES_KEY = result_aeskey.data;
  }
  encryptWithAES_RSA(to_encrypt: string): Promise<IGenericResult> {
    try {
      const iv = forge.random.getBytesSync(constants.AES_LENGTH);
      const cipher = forge.cipher.createCipher('AES-CBC', this.AES_KEY);
      cipher.start({ iv });
      cipher.update(forge.util.createBuffer(to_encrypt));
      cipher.finish();
      const encryptedData = forge.util.encode64(iv + cipher.output.getBytes());
      return Promise.resolve({
        result: true,
        data: encryptedData,
      } as IGenericResult);
    } catch (error) {
      console.error('ERROR ENCRYPTING DATA USING AES_RSA', error);
      return Promise.resolve({
        result: false,
        data: 'Encryption AES_RSA failed',
      });
    }
  }
  decryptWithAES_RSA(to_decrypt: string): Promise<IGenericResult> {
    try {
      const rawEncrypted = forge.util.decode64(to_decrypt);
      const ivReceived = rawEncrypted.slice(0, 16);
      const encryptedBlock = rawEncrypted.slice(16);

      const decipher = forge.cipher.createDecipher('AES-CBC', this.AES_KEY);
      decipher.start({ iv: ivReceived });
      decipher.update(forge.util.createBuffer(encryptedBlock));
      decipher.finish();

      const decryptedStr = decipher.output.toString();
      return Promise.resolve({
        result: true,
        data: decryptedStr,
      });
    } catch (error) {
      console.error('ERROR DECRYPTING DATA USING AES_RSA', error);
      throw new Error('Invalid token. Please log in again.');
    }
  }

  private decryptWithRSA(data: string): IGenericResult {
    try {
      const privateKey = forge.pki.privateKeyFromPem(
        this.env.rsaPrivateKey as string,
      );
      const data_decoded = forge.util.decode64(data);
      const decrypted = privateKey.decrypt(data_decoded);
      return {
        result: true,
        data: decrypted,
      };
    } catch (error) {
      console.error('ERROR DECRYPTING DATA USING RSA', error);
      return {
        result: false,
        data: 'Decryption RSA failed',
      };
    }
  }
}
