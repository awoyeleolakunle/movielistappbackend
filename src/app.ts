import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import movieRouter from "./routes/movieRoutes";
import userRouter from "./routes/userRouter";
import loginRouter from "./routes/loginRouter";

import connectToDatabase from "../src/db/db";

import cors from "cors";

const app: Application = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(bodyParser.json());

const PAGE_NOT_FOUND = (req: Request, res: Response) => {
  return res.send("Page cannot be found");
};

connectToDatabase();

app.use("/api/v1/movielistapp/", movieRouter);
app.use("/api/v1/movielistapp/", userRouter);
app.use("/api/v1/movielistapp/", loginRouter);

app.use("/api/v1/movielistapp", PAGE_NOT_FOUND);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Server Error");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
