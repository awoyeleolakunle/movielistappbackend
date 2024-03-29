import { MovieRequestInput } from "../../requestInput/movieRequest";
import Movie, { MovieModel } from "../../models/movieModel";
import { ErrorClass, Errors } from "../../exception";
import { ErrorMessage } from "../../errorMessages";
import { ErrorType, SuccessMessage } from "../../constants";

const movieError = {
  name: ErrorType.MovieError,
  message: "Movie already exists",
};

export class MovieCreationService {
  static async createMovie(
    movieRequestInput: MovieRequestInput
  ): Promise<String> {
    try {
      const existingMovie = await Movie.findOne({
        title: movieRequestInput.title,
      });
      if (existingMovie) {
        throw new ErrorClass(movieError as Errors);
      }

      console.log("I got here");

      const newMovie: MovieModel = new Movie(movieRequestInput);
      await newMovie.save();
      return SuccessMessage.MOVIE_ADDED_SUCESSFULLY;
    } catch (error) {
      if (error instanceof ErrorClass) {
        throw new ErrorClass(movieError as Errors);
      } else {
        console.log("An error occurred: ", error);
        throw new Error(ErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE);
      }
    }
  }
}
