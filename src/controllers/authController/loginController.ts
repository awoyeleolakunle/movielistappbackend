import { Request, Response } from "express";
import User, { UserModel } from "../../models/userModel";
import { ErrorClass, LoginError } from "../../exception";
import { ErrorMessage } from "../../errorMessages";
import { generateToken } from "../../api/utils/jwt.utils";
import { HttpStatus } from "../../constants";
import { LoginRequest } from "../../requestInput/loginRequest";
import { LoginService } from "../../service/authService/loginService";

export const loginController = async (req: Request, res: Response) => {
  try {
    const loginRequest: LoginRequest = req.body;

    const foundUser: UserModel = await LoginService.login(loginRequest);

    const generatedToken = generateToken(foundUser);

    res.status(HttpStatus.OK).json(generatedToken);
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
