import { Request, Response, NextFunction } from "express";
import { validateToken } from "./../utils/jwt.utils";

export const authorize =
  (allowedAccessTypes: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(allowedAccessTypes);
    console.log(req.headers.authorization);
    try {
      let jwt = req.headers.authorization;

      if (!jwt) {
        return res.status(401).json({ message: "Invalid token " });
      }

      if (jwt.toLowerCase().startsWith("bearer")) {
        jwt = jwt.slice("bearer".length).trim();
        console.log("I'm the token after bearer has been trimed ", jwt);
      }

      const decodedToken = await validateToken(jwt);

      console.log("I'm the decoded token ", decodedToken);

      // const hasAccessToEndpoint = allowedAccessTypes.some((at) =>
      //   decodedToken.accessTypes.some((uat) => uat.includes(at))
      // );

      allowedAccessTypes.some((at) => console.log(at));
      // const hasAccessToEndpoint = allowedAccessTypes.some((at) => {
      //   console.log("Required Access Type:", at);
      //   console.log("User Access Types:", decodedToken.accessTypes);

      //   const hasAccess = decodedToken.accessTypes.includes(at);
      //   console.log("Has Access:", hasAccess);

      //   return hasAccess;
      // });

      console.log(typeof decodedToken);

      const accessTypes = decodedToken.accessTypes;

      console.log("I'm the access type ", accessTypes);

      const hasAccessToEndpoint = allowedAccessTypes.some((at) => {
        console.log("Required Access Type:", at);
        console.log("User Access Types:", decodedToken.accessTypes);

        const hasAccess = decodedToken.accessTypes.includes(at);
        console.log("Has Access:", hasAccess);

        return hasAccess;
      });

      console.log("Has Access to Endpoint:", hasAccessToEndpoint);

      if (!hasAccessToEndpoint) {
        return res
          .status(401)
          .json({ message: "No enough privileges to access endpoint" });
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
