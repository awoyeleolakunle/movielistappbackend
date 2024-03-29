import { Request, Response } from "express";
import Movie, { MovieModel } from "../../models/movieModel";
import { ErrorMessage } from "../../errorMessages";
import { ErrorClass } from "../../exception";
import { HttpStatus } from "../../constants";
import { MovieRequestInput } from "../../requestInput/movieRequest";
import { MovieCreationService } from "../../service/movieService/movieCreationService";
import { GenerateApiResponse } from "../../utils";

export const createMoviecontroller = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movieRequestInput: MovieRequestInput = req.body;

    console.log("I'm the movie request :", movieRequestInput);

    const movieCreationSucessMessage: String =
      await MovieCreationService.createMovie(movieRequestInput);

    console.log(
      "I'm the saved movie success message ",
      movieCreationSucessMessage
    );
    res
      .status(HttpStatus.CREATED)
      .json(
        GenerateApiResponse.returnCreatedResponse(movieCreationSucessMessage)
      );
  } catch (error) {
    if (error instanceof ErrorClass) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json(
          GenerateApiResponse.returnBadRequestResponse<String>(error.message)
        );
    } else {
      console.log("An error occurred: ", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(
          GenerateApiResponse.returnInternalServerErrorResponse<String>(
            ErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE
          )
        );
    }
  }
};
// export const createMovie = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const {
//       title,
//       genre,
//       director,
//       imageUrl,
//       cast,
//       pgRatings,
//       description,
//       likes,
//     } = req.body;

//     const existingMovie = await Movie.findOne({ title });

//     if (existingMovie) {
//       throw new MovieError(ErrorMessage.MOVIE_EXISTS);
//     }

//     const newMovie: MovieModel = new Movie({
//       title,
//       genre,
//       director,
//       imageUrl,
//       cast,
//       pgRatings,
//       description,
//       likes,
//     });
//     const savedMovie = await newMovie.save();
//     res.status(HttpStatus.CREATED).json(savedMovie);
//   } catch (error) {
//     if (error instanceof MovieError) {
//       res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
//     } else {
//       console.log("An error occurred: ", error);
//       res
//         .status(HttpStatus.INTERNAL_SERVER_ERROR)
//         .send(ErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE);
//     }
//   }
// };
