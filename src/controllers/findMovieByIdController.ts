import { Response, Request } from "express";
import Movie, { MovieModel } from "../models/movieModel";
import { MovieError } from "../exception";
import { ErrorMessage } from "../errorMessages";
import { HttpStatus } from "../constants";

export const findMovieById = async (req: Request, res: Response) => {
  try {
    const id = req.query.id as string;
    const foundMovie: MovieModel | null = await Movie.findById(id);

    if (foundMovie === null) {
      throw new MovieError(ErrorMessage.MOVIE_NOT_FOUND);
    }

    res.status(HttpStatus.OK).json(foundMovie);
  } catch (error) {
    if (error instanceof MovieError) {
      res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
    } else {
      console.log("An error occurred: ", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }
};
