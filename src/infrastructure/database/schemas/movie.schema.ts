import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Movie extends Document {
  @Prop({ required: true, unique: true })
  title: string;
  @Prop({ required: true, unique: true })
  episode_id: number;
  @Prop({ required: true })
  opening_crawl: string;
  @Prop({ required: true })
  director: string;
  @Prop({ required: true })
  producer: string;
  @Prop({ required: false })
  release_date: string;
}
export type MovieDocument = Movie & Document;
export const MovieSchema = SchemaFactory.createForClass(Movie);
