import { Request, Response, NextFunction } from "express";
import { validateToken } from "./../utils/jwt.utils";
import { GenerateApiResponse } from "./../../utils";
import { ErrorMessage } from "./../../errorMessages";

export const authorize =
  (allowedAccessTypes: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let jwt = req.headers.authorization;

      if (!jwt) {
        return res.status(401).json({ message: "Invalid token " });
      }

      if (jwt.toLowerCase().startsWith("bearer")) {
        jwt = jwt.slice("bearer".length).trim();
      }

      const decodedToken = await validateToken(jwt);

      const hasAccessToEndpoint = allowedAccessTypes.some((at) => {
        const hasAccess = decodedToken.payload.accessTypes.includes(at);

        return hasAccess;
      });

      if (!hasAccessToEndpoint) {
        return res.status(401).json({
          error: GenerateApiResponse.returnUnauthoriseAccessResponse(
            ErrorMessage.UNAUTHORIZED_ACCESS
          ),
        });
      }

      next();
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "TokenExpiredError") {
        res.status(401).json({ message: "Expired token" });
        return;
      }
      console.error("Error: Failed to authenticate user");
      res.status(500).json({ message: "Failed to authenticate user" });
    }
  };
