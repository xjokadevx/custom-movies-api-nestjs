import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  roleId: number;

  @Prop({ required: true })
  pwd: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
