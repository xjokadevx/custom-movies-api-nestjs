import { UserDocument } from '../schemas/user.schema';
import { UserEntity } from '../../../domain/models/user.entity';

export class UserMapper {
  static toDomain(doc: UserDocument): UserEntity | null {
    if (!doc) return null;
    return new UserEntity(
      doc.roleId,
      doc.phone,
      doc.name,
      doc.pwd,
      doc._id?.toString(),
    );
  }

  static toSaveDoc(user: UserEntity): Partial<UserDocument> {
    return {
      roleId: user.roleId,
      name: user.name,
      phone: user.phone,
      pwd: user.pwd,
    };
  }
}
