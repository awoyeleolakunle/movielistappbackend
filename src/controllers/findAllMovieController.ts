import Movie, { MovieModel } from "../models/movieModel";

import { Response, Request } from "express";

import { ErrorMessage } from "../errorMessages";
import { HttpStatus } from "../constants";

export const findAllMovies = async (req: Request, res: Response) => {
  try {
    const allMovies: MovieModel[] = await Movie.find();

    res.status(HttpStatus.OK).json(allMovies);
  } catch (error) {
    console.log("An error occurred: ", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send(ErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE);
  }
};
