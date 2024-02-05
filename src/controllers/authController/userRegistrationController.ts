import { Request, Response } from "express";
import User, { UserModel } from "../../models/userModel";
import { ErrorMessage } from "../../errorMessages";
import { ErrorClass } from "../../exception";
import { HttpStatus } from "../../constants";

import { UserRegistrationRequest } from "../../requestInput/userRequest";
import { UserRegistrationService } from "../../service/authService/userRegistrationService";
import { GenerateApiResponse } from "./../../utils";

export const registerUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userRegistrationRequest: UserRegistrationRequest = req.body;
    console.log("I got here");
    const tokenAttachedToNewlyRegisteredUser: String =
      await UserRegistrationService.createUser(userRegistrationRequest);

    res
      .status(HttpStatus.CREATED)
      .json(
        GenerateApiResponse.returnCreatedResponse<String>(
          tokenAttachedToNewlyRegisteredUser
        )
      );
  } catch (error) {
    if (error instanceof ErrorClass) {
      console.log("AN ERROR WAS THROWN ");
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
