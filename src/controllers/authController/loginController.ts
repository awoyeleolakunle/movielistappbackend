import { Request, Response } from "express";
import User, { UserModel } from "../../models/userModel";
import { ErrorClass } from "../../exception";
import { ErrorMessage } from "../../errorMessages";

import { HttpStatus } from "../../constants";
import { LoginRequest } from "../../requestInput/loginRequest";
import { LoginService } from "../../service/authService/loginService";
import { GenerateApiResponse } from "./../../utils";

export const loginController = async (req: Request, res: Response) => {
  try {
    const loginRequest: LoginRequest = req.body;

    const tokenAttachedToUser: String = await LoginService.login(loginRequest);

    res
      .status(HttpStatus.OK)
      .json(GenerateApiResponse.returnOkResponse<String>(tokenAttachedToUser));
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
