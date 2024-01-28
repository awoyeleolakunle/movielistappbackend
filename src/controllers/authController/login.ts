import { Request, Response } from "express";
import User, { UserModel } from "../../models/userModel";
import { LoginError } from "../../exception";
import { ErrorMessage } from "../../errorMessages";
import * as bcrypt from "bcrypt";
import { generateToken } from "../../api/utils/jwt.utils";
import { HttpStatus } from "../../constants";

export const login = async (req: Request, res: Response) => {
  try {
    const { emailAddress, password } = req.body;

    const foundUser = await User.findOne({ emailAddress });

    if (!foundUser) {
      throw new LoginError(ErrorMessage.INVALID_USER_DETAILS);
    }

    console.log(password);
    const isTheSamePassword = await bcrypt.compare(
      password,
      foundUser.password
    );
    console.log(isTheSamePassword);
    if (!isTheSamePassword) {
      throw new LoginError(ErrorMessage.INVALID_USER_DETAILS);
    }

    const generatedToken = generateToken(foundUser);

    res.status(HttpStatus.OK).json(generatedToken);
  } catch (error) {
    if (error instanceof LoginError) {
      res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
    } else {
      console.log("An error occurred: ", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }
};
