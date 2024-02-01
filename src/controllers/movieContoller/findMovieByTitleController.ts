import { Response, Request } from "express";
import Movie, { MovieModel } from "../../models/movieModel";
import { MovieError, ErrorClass } from "../../exception";
import { ErrorMessage } from "../../errorMessages";
import { HttpStatus } from "../../constants";
import { MovieFinderByTitleService } from "../../service/movieService/movieFinderByTitleService";

export const findMovieByTitleController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const title = req.query.title as string;
    console.log("I'm the title found ", title);

    const foundMovie: MovieModel | null =
      await MovieFinderByTitleService.findMovieByTitle(title);

    if (!foundMovie) {
      // throw new MovieError(ErrorMessage.MOVIE_NOT_FOUND);
    }

    res.status(HttpStatus.OK).json(foundMovie);
  } catch (error) {
    console.error("Error finding movies by title:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: ErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE });
  }
};
