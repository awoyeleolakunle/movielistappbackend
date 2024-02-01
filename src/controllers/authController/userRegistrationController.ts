import { Request, Response } from "express";
import User, { UserModel } from "../../models/userModel";
import { ErrorMessage } from "../../errorMessages";
import { ErrorClass, RegistrationError } from "../../exception";
import { HttpStatus } from "../../constants";
import { generateToken } from "../../api/utils/jwt.utils";
import { UserRegistrationRequest } from "../../requestInput/userRequest";
import { UserRegistrationService } from "../../service/authService/userRegistrationService";

export const registerUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userRegistrationRequest: UserRegistrationRequest = req.body;

    const savedUser: UserModel = await UserRegistrationService.createUser(
      userRegistrationRequest
    );

    const token: string = generateToken(savedUser);

    res.status(HttpStatus.CREATED).json(token);
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
