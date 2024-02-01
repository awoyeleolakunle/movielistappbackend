import { Router } from "express";
import { createMoviecontroller } from "../controllers/movieContoller/movieCreationController";
import { findMovieByIdContorller } from "../controllers/movieContoller/findMovieByIdController";
import { findAllMoviesController } from "../controllers/movieContoller/findAllMovieController";
import { findMovieByTitleController } from "../controllers/movieContoller/findMovieByTitleController";
import * as Auth from "../api/middlewares/auth.middleware";

const router = Router();

router.post("/movieCreation", createMoviecontroller);

//post("/movieCreation", createMovie);

router.get("/findMovie", findMovieByIdContorller);
router.get("/allMovie", findAllMoviesController);
router.get("/findMovieByTitle", findMovieByTitleController);

export default router;
