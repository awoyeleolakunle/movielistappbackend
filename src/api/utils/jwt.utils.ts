import { sign, SignOptions, verify, VerifyOptions } from "jsonwebtoken";
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

export function validateToken(token: string): Promise<TokenPayload> {
  const publicKey = fs.readFileSync(
    path.join(__dirname, "./../../../public.key")
  );

  const verifyOptions: VerifyOptions & { complete: true } = {
    algorithms: ["HS256"],
    complete: true,
  };

  return new Promise((resolve, reject) => {
    verify(
      token,
      publicKey,
      verifyOptions,
      (error, decoded: Object | string | TokenPayload | undefined) => {
        if (error) return reject(error);
        if (!decoded) {
          return reject(new Error("Token verification failed"));
        }

        resolve(decoded as TokenPayload);
      }
    );
  });
}
