import { Document, model, Schema, Types } from "mongoose";

export interface MovieModel extends Document {
  _id: Types.ObjectId;
  title: string;
  genre: string;
  director: string;
  imageUrl: string;
  cast: string[];
  pgRatings: string;
  description: string;
  likes?: number;
}

const movieSchema = new Schema<MovieModel>({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  director: { type: String, required: true },
  imageUrl: { type: String, required: true },
  cast: [{ type: String, required: true }],
  pgRatings: { type: String, required: true },
  description: { type: String, required: true },
  likes: { type: Number },
});

export default model<MovieModel>("Movie", movieSchema);
