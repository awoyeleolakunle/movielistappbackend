import User, { UserModel } from "../../models/userModel";
import { ErrorClass, Errors } from "../../exception";
import { ErrorType } from "../../constants";
import { ErrorMessage } from "../../errorMessages";

export const userError = {
  name: ErrorType.UserError,
  message: ErrorMessage.USER_NOT_FOUND,
};
export class UserFinderByEmailAddress {
  static async findUserByEmailAddress(
    emailAddress: string
  ): Promise<UserModel | null> {
    try {
      const foundUser: UserModel | null = await User.findOne({
        emailAddress: emailAddress,
      });

      if (!foundUser) {
        throw new ErrorClass(userError as Errors);
      }
      return foundUser;
    } catch (error) {
      if (error instanceof ErrorClass) {
        throw new ErrorClass(userError as Errors);
      } else {
        console.error("Error finding user by name:", error);
        throw new Error(ErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE);
      }
    }
  }
}
