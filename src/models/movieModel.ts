import { Document, model, Schema, Types } from "mongoose";

export interface MovieModel extends Document {
  _id: Types.ObjectId;
  title: string;
  genre: string;
  director?: string;
  imageUrl: string;
}

const movieSchema = new Schema<MovieModel>({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  director: { type: String },
  imageUrl: { type: String, required: true },
});

export default model<MovieModel>("Movie", movieSchema);
