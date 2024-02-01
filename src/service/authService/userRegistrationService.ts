import { UserRegistrationRequest } from "../../requestInput/userRequest";
import User, { UserModel } from "../../models/userModel";
import { ErrorType } from "../../constants";
import { ErrorClass, Errors } from "../../exception";
import { ErrorMessage } from "../../errorMessages";
import * as bcrypt from "bcrypt";

const registrationError = {
  RegistrationError: {
    name: ErrorType.RegistrationError,
    message: ErrorMessage.USER_ALREADY_EXISTS,
  },
};

export class UserRegistrationService {
  static async createUser(
    userRegistrationRequest: UserRegistrationRequest
  ): Promise<UserModel> {
    try {
      const existingUser: UserModel | null = await User.findOne({
        emailAddress: userRegistrationRequest.emailAddress,
      });
      if (existingUser) {
        throw new ErrorClass(
          ErrorType.RegistrationError,
          registrationError as Errors
        );
      }

      const harshedPassword = await bcrypt.hash(
        userRegistrationRequest.password,
        10
      );
      userRegistrationRequest.password = harshedPassword;

      const newUser: UserModel = new User(userRegistrationRequest);
      newUser.dateCreated = new Date();
      newUser.accessType = ["USER"];

      return await newUser.save();
    } catch (error) {
      if (error instanceof ErrorClass) {
        throw new ErrorClass(
          ErrorType.RegistrationError,
          registrationError as Errors
        );
      } else {
        console.log("An error occurred: ", error);
        throw new Error(ErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE);
      }
    }
  }
}
