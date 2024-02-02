import { UserModel } from "../../models/userModel";
import { LoginRequest } from "../../requestInput/loginRequest";
import { UserFinderByEmailAddress } from "../userService/userFindByEmailAddressService";
import * as bcrypt from "bcrypt";
import { ErrorClass, Errors } from "../../exception";
import { ErrorType } from "../../constants";
import { ErrorMessage } from "../../errorMessages";
import { generateToken } from "../../api/utils/jwt.utils";

const loginError = {
  name: ErrorType.LoginError,
  message: ErrorMessage.INVALID_USER_DETAILS,
};

export class LoginService {
  static async login(loginRequest: LoginRequest): Promise<String> {
    try {
      const foundUser = await UserFinderByEmailAddress.findUserByEmailAddress(
        loginRequest.emailAddress
      );

      if (!foundUser) {
        throw new ErrorClass(loginError as Errors);
      }

      const isTheSamePassword = await bcrypt.compare(
        loginRequest.password,
        foundUser.password
      );
      if (!isTheSamePassword) {
        throw new ErrorClass(loginError as Errors);
      }
      const generatedToken = generateToken(foundUser);
      return generatedToken;
    } catch (error) {
      if (error instanceof ErrorClass) {
        throw new ErrorClass(loginError as Errors);
      } else {
        console.error("Error finding movie by name:", error);
        throw new Error(ErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE);
      }
    }
  }
}
