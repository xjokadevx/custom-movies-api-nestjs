import { IGenericResult } from '../interfaces/genericResult.interface';

export interface IJwtServiceInterface {
  sign(payload: any): IGenericResult;
  verify(token: string): IGenericResult;
  compare(token: string, hash: string): IGenericResult;
}
