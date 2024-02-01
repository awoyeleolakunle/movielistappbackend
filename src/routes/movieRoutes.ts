import { Router } from "express";
import { createMoviecontroller } from "../controllers/movieController";
import { findMovieByIdContorller } from "../controllers/findMovieByIdController";
import { findAllMoviesController } from "../controllers/findAllMovieController";
import { findMovieByTitleController } from "../controllers/findMovieByTitleController";
import * as Auth from "../api/middlewares/auth.middleware";

const router = Router();

router.post("/movieCreation", createMoviecontroller);

//post("/movieCreation", createMovie);

router.get("/findMovie", findMovieByIdContorller);
router.get("/allMovie", findAllMoviesController);
router.get("/findMovieByTitle", findMovieByTitleController);

export default router;
