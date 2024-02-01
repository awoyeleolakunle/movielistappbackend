import Movie, { MovieModel } from "../../models/movieModel";
import { ErrorMessage } from "../../errorMessages";

export class AllMovieFinderService {
  static async findAllMovie(): Promise<MovieModel[]> {
    try {
      return await Movie.find();
    } catch (error) {
      throw new Error(ErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }
}
