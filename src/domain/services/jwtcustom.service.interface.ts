import { IGenericResult } from './../../shared/interfaces/genericResult.interface';

export interface IJwtServiceInterface {
  sign(payload: any): Promise<IGenericResult>;
  verify(token: string): Promise<IGenericResult>;
}
