import { Request, Response } from "express";
import User, { UserModel } from "../../models/userModel";
import { ErrorMessage } from "../../errorMessages";
import { RegistrationError } from "../../exception";
import { HttpStatus } from "../../constants";
import { generateToken } from "../../api/utils/jwt.utils";
import * as bcrypt from "bcrypt";
import userModel from "../../models/userModel";

export const registerUser = async (req: Request, res: Response) => {
  try {
    // const sendResponse = (
    //   res: Response,
    //   data: any,
    //   success: boolean = true,
    //   status: number = HttpStatus.OK
    // ) => {
    //   res.status(status).json({ success, data });
    // };

    const { emailAddress, password, phoneNumber } = req.body;

    const isRgisteredUser = await User.findOne({ emailAddress });
    if (isRgisteredUser) {
      throw new RegistrationError(ErrorMessage.USER_ALREADY_EXISTS);
    }

    console.log(password);
    const harshedPassword = await bcrypt.hash(password, 10);

    const newUser: UserModel = new User({
      emailAddress,
      password: harshedPassword,
      phoneNumber,
      accessType: ["USER"],
    });

    const savedUser = await newUser.save();

    const token: string = generateToken(savedUser);

    res.status(HttpStatus.CREATED).json(token);
  } catch (error) {
    if (error instanceof RegistrationError) {
      res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
    } else {
      console.log("An error occurred: ", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }
};
