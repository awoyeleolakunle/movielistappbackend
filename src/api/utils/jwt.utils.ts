import {
  sign,
  SignOptions,
  verify,
  VerifyOptions,
  JwtPayload,
  Secret,
} from "jsonwebtoken";
import * as fs from "fs";
import * as path from "path";
import { UserModel } from "../../models/userModel";

export function generateToken(user: UserModel) {
  const payload = {
    emailAddress: user.emailAddress,
    userId: user.id,
    accessTypes: user.accessType,
  };

  const privateKey = fs.readFileSync(
    path.join(__dirname, "./../../../private.key")
  );

  const signInOptions: SignOptions = {
    algorithm: "HS256",
    expiresIn: "1h",
  };
  return sign(payload, privateKey, signInOptions);
}

interface TokenPayload {
  exp: number;
  accessTypes: string[];
  emailAddress: string;
  userId: number;
}

export function validateToken(token: string): Promise<any> {
  console.log("I entered here to validate ");
  const publicKey = fs.readFileSync(
    path.join(__dirname, "./../../../public.key")
  );

  const privateKey = fs.readFileSync(
    path.join(__dirname, "./../../../private.key")
  );

  console.log("I found the public key");

  const verifyOptions: VerifyOptions & { complete: true } = {
    algorithms: ["HS256"],
    complete: true,
  };

  return new Promise((resolve, reject) => {
    verify(
      token,
      privateKey as Secret,
      verifyOptions,
      (error, decoded: Object | TokenPayload | JwtPayload | undefined) => {
        if (error) {
          console.error("Error during token verification:", error);
          return reject(error);
        }

        if (!decoded) {
          console.error("Decoded token is undefined");
          return reject(new Error("Token verification failed"));
        }

        resolve(decoded as TokenPayload);
      }
    );
  });
}
