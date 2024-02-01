import { promises } from "dns";
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

export class MovieFinderById {
  static async findMoiveById(id: string): Promise<MovieModel | null> {
    try {
      const foundMovie: MovieModel | null = await Movie.findOne({ id });
      if (!foundMovie) {
        console.log("I entered here ");
        throw new ErrorClass(ErrorType.MovieError, movieError as Errors);
      }
      return foundMovie;
    } catch (error) {
      if (error instanceof ErrorClass) {
        throw new ErrorClass(ErrorType.MovieError, movieError as Errors);
      } else {
        throw new Error(ErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE);
      }
    }
  }
}
