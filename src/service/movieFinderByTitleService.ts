import Movie, { MovieModel } from "../models/movieModel";
import { ErrorMessage } from "./../errorMessages";

export class MovieFinderByTitleService {
  static async findMovieByTitle(title: string): Promise<MovieModel | null> {
    try {
      return await Movie.findOne({ title });
    } catch (error) {
      console.error("Error finding movie by name:", error);
      throw new Error(ErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }
}
