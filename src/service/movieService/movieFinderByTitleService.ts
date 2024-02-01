import Movie, { MovieModel } from "../../models/movieModel";
import { ErrorMessage } from "../../errorMessages";
import { ErrorClass, MovieError, Errors } from "../../exception";
import { ErrorType } from "../../constants";

const movieError = {
  MovieError: {
    name: ErrorType.MovieError,
    message: ErrorMessage.MOVIE_NOT_FOUND,
  },
};

export class MovieFinderByTitleService {
  static async findMovieByTitle(title: string): Promise<MovieModel | null> {
    try {
      const foundMovie: MovieModel | null = await Movie.findOne({ title });
      if (!foundMovie) {
        throw new ErrorClass(ErrorType.MovieError, movieError as Errors);
      }
      return foundMovie;
    } catch (error) {
      if (error instanceof ErrorClass) {
        throw new ErrorClass(ErrorType.MovieError, movieError as Errors);
      } else {
        console.error("Error finding movie by name:", error);
        throw new Error(ErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE);
      }
    }
  }
}
