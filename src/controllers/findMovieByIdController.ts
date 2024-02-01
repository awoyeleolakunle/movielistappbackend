import { Response, Request } from "express";
import Movie, { MovieModel } from "../models/movieModel";
import { ErrorClass } from "../exception";
import { ErrorMessage } from "../errorMessages";
import { HttpStatus } from "../constants";
import { MovieFinderById } from "../service/movieService/movieFinderByIdService";

export const findMovieByIdContorller = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.query.id as string;
    const foundMovie: MovieModel | null = await MovieFinderById.findMoiveById(
      id
    );

    res.status(HttpStatus.OK).json(foundMovie);
  } catch (error) {
    if (error instanceof ErrorClass) {
      res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
    } else {
      console.log("An error occurred: ", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }
};
