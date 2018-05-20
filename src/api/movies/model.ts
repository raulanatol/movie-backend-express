import { Document, Schema, Model, model } from "mongoose";

export interface IMovieModel extends Document {
  name: string,
  updated: Date,
  created: Date,
  like: boolean
}

const MovieSchema: Schema = new Schema({
  name: { type: String, required: true },
  updated: { type: Date, default: Date.now() },
  created: { type: Date, default: Date.now() },
  like: { type: Boolean }
});

export const Movie: Model<IMovieModel> = model<IMovieModel>('movies', MovieSchema);
