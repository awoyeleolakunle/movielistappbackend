import { Response, Request } from "express";
import Movie, { MovieModel } from "../models/movieModel";
import { MovieError } from "../exception";
import { ErrorMessage } from "../errorMessages";
import { HttpStatus } from "../constants";

export const findMovieByTitle = async (req: Request, res: Response) => {
  const title = req.query.title as string;

  console.log("I'm the title found ", title);

  try {
    const foundMovie: MovieModel[] | null = await Movie.findOne({
      title: title,
    });

    if (!foundMovie) {
      throw new MovieError(ErrorMessage.MOVIE_NOT_FOUND);
    }

    res.status(HttpStatus.OK).json(foundMovie);
  } catch (error) {
    console.error("Error finding movies by title:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
