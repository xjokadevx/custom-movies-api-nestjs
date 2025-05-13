import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { UserEntity } from 'src/domain/models/user.entity';
import { UserMapper } from './mappers/user.mapper';

@Injectable()
export class UserServiceImpl implements IUserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}
  findById(id: string): Promise<UserEntity | null> {
    console.error(id);
    throw new Error('Method not implemented.');
  }
  deleteById(id: string): Promise<void> {
    console.error(id);
    throw new Error('Method not implemented.');
  }
  async findByPhone(phone: string): Promise<UserEntity | null> {
    try {
      const user = await this.userModel.findOne<UserDocument>({ phone });
      return user ? UserMapper.toDomain(user) : null;
    } catch (error) {
      console.error('Error finding user', error);
      return null;
    }
  }
  async save(user: UserEntity): Promise<{ data: string; result: boolean }> {
    try {
      const result = await this.userModel.create(
        UserMapper.toPersistence(user),
      );
      if (!result) {
        return {
          data: 'Error creating user',
          result: false,
        };
      }
      return {
        data: result._id as string,
        result: true,
      };
    } catch (error) {
      console.error('Error creating user', error);
      return {
        data: 'Error creating user',
        result: false,
      };
    }
  }
}
