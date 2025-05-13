import { IGenericResult } from '../interfaces/genericResult.interface';

export interface IEncryptServiceInterface {
  encryptWithAES_RSA(to_encrypt: string): IGenericResult;
  decryptWithAES_RSA(to_decrypt: string): IGenericResult;
}
