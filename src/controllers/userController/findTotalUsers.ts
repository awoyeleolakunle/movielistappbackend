import user, { UserModel } from "../../models/userModel";
import { Request, Response } from "express";
import { ErrorMessage } from "../../errorMessages";
import { HttpStatus } from "../../constants";
import { GenerateApiResponse } from "./../../utils";

export const findTotalUser = async (req: Request, res: Response) => {
  try {
    const allUsers: UserModel[] = await user.find();

    res
      .status(HttpStatus.OK)
      .json(GenerateApiResponse.returnOkResponse<Number>(allUsers.length));
  } catch (error) {
    {
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
