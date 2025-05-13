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
  @Prop({ required: false })
  characters: string[];
  @Prop({ required: false })
  planets: string[];
  @Prop({ required: false })
  starships: string[];
  @Prop({ required: false })
  vehicles: string[];
  @Prop({ required: false })
  species: string[];
  @Prop({ required: false })
  created: string;
  @Prop({ required: false })
  edited: string;
  @Prop({ required: false })
  url: string;
}
export type MovieDocument = Movie & Document;
export const MovieSchema = SchemaFactory.createForClass(Movie);
