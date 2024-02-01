import { MovieRequestInput } from "../../requestInput/movieRequest";
import Movie, { MovieModel } from "../../models/movieModel";
import { ErrorClass, MovieError, Errors } from "../../exception";
import { ErrorMessage } from "../../errorMessages";
import { ErrorType } from "../../constants";

const movieError = {
  MovieError: {
    name: ErrorType.MovieError,
    message: "Movie already exists",
  },
};

export class MovieCreationService {
  static async createMovie(
    movieRequestInput: MovieRequestInput
  ): Promise<MovieModel> {
    try {
      const existingMovie = await Movie.findOne({
        title: movieRequestInput.title,
      });
      if (existingMovie) {
        throw new ErrorClass(ErrorType.MovieError, movieError as Errors);
      }

      console.log("I got here");

      const newMovie: MovieModel = new Movie(movieRequestInput);
      return await newMovie.save();
    } catch (error) {
      if (error instanceof ErrorClass) {
        throw new ErrorClass(ErrorType.MovieError, movieError as Errors);
      } else {
        console.log("An error occurred: ", error);
        throw new Error(ErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE);
      }
    }
  }
}
