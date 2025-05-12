// src/infrastructure/database/mappers/user.mapper.ts
import { UserDocument } from '../schemas/user.schema';
import { UserEntity } from '../../../domain/models/user.entity';

export class UserMapper {
  static toDomain(doc: UserDocument): UserEntity {
    return new UserEntity(doc.roleId, doc.phone, doc.name, doc.pwd);
  }

  static toPersistence(user: UserEntity): Partial<UserDocument> {
    return {
      roleId: user.roleId,
      name: user.name,
      phone: user.phone,
      pwd: user.pwd,
    };
  }
}
