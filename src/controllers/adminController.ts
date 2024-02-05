import { Request, Response } from "express";
import { UserRegistrationRequest } from "./../requestInput/userRequest";
import User, { UserModel } from "../models/userModel";
import { ErrorClass, Errors } from "./../exception";
import { ErrorType, HttpStatus } from "./../constants";
import { ErrorMessage } from "./../errorMessages";
import { GenerateApiResponse } from "./../utils";
import * as bcrypt from "bcrypt";

const registrationError = {
  name: ErrorType.RegistrationError,
  message: ErrorMessage.USER_ALREADY_EXISTS,
};
export const registerAdminController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const adminRegistrationRequest: UserRegistrationRequest = req.body;

    const existingUser: UserModel | null = await User.findOne({
      emailAddress: adminRegistrationRequest.emailAddress,
    });
    if (existingUser) {
      throw new ErrorClass(registrationError as Errors);
    }

    const harshedPassword = await bcrypt.hash(
      adminRegistrationRequest.password,
      10
    );

    adminRegistrationRequest.password = harshedPassword;
    const newAdmin: UserModel = new User(adminRegistrationRequest);
    newAdmin.accessType = ["ADMIN"];
    newAdmin.dateCreated = new Date();
    await newAdmin.save();
  } catch (error) {
    if (error instanceof ErrorClass) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json(
          GenerateApiResponse.returnBadRequestResponse({ error: error.message })
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
