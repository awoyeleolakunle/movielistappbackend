import { Response, Request } from "express";
import Movie, { MovieModel } from "../../models/movieModel";
import { ErrorClass } from "../../exception";
import { ErrorMessage } from "../../errorMessages";
import { HttpStatus } from "../../constants";
import { MovieFinderByTitleService } from "../../service/movieService/movieFinderByTitleService";
import { GenerateApiResponse } from "../../utils";

export const findMovieByTitleController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const title = req.query.title as string;
    console.log("I'm the title found ", title);

    const foundMovie: MovieModel =
      await MovieFinderByTitleService.findMovieByTitle(title);

    res
      .status(HttpStatus.OK)
      .json(GenerateApiResponse.returnOkResponse(foundMovie));
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
