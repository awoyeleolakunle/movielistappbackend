import Movie, { MovieModel } from "../models/movieModel";

import { Response, Request } from "express";

import { ErrorMessage } from "../errorMessages";
import { HttpStatus } from "../constants";
import { AllMovieFinderService } from "../service/movieService/allMovieFinderService";

export const findAllMoviesController = async (req: Request, res: Response) => {
  try {
    const listOfAllMovies: MovieModel[] =
      await AllMovieFinderService.findAllMovie();

    res.status(HttpStatus.OK).json(listOfAllMovies);
  } catch (error) {
    console.log("An error occurred: ", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send(ErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE);
  }
};
