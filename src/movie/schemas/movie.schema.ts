import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IGenre } from '../intefaces/IGenre';

export type MovieDocument = Movie & Document;

@Schema(
  {
    collection: "netflix.movies",
    toJSON: {
      transform: (doc: MovieDocument, ret) => {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
      }
    }
  }
)
export class Movie {

  @Prop()
  name: string;

  @Prop()
  overview: string;

  @Prop()
  popularity: number;

  @Prop()
  voteAverage: number;

  @Prop()
  voteCount: number;

  @Prop()
  releaseDate: string;

  @Prop()
  genre: IGenre[];

}

export const MovieSchema = SchemaFactory.createForClass(Movie);