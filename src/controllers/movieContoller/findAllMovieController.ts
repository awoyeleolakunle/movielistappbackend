import Movie, { MovieModel } from "../../models/movieModel";

import { Response, Request } from "express";

import { ErrorMessage } from "../../errorMessages";
import { HttpStatus } from "../../constants";
import { AllMovieFinderService } from "../../service/movieService/allMovieFinderService";
import { GenerateApiResponse } from "../../utils";
import { ErrorClass } from "../../exception";

export const findAllMoviesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const listOfAllMovies: MovieModel[] =
      await AllMovieFinderService.findAllMovie();

    res
      .status(HttpStatus.OK)
      .json(GenerateApiResponse.returnOkResponse(listOfAllMovies));
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
