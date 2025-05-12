import { UserEntity } from '../models/user.entity';

export interface IUserRepository {
  findByPhone(phone: string): Promise<UserEntity | null>;
  save(user: UserEntity): Promise<{ data: string; result: boolean }>;
  findById(id: string): Promise<UserEntity | null>;
  deleteById(id: string): Promise<void>;
}
