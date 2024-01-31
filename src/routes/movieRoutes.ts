import { Router } from "express";
import { createMoviecontroller } from "../controllers/movieController";
import { findMovieById } from "../controllers/findMovieByIdController";
import { findAllMovies } from "../controllers/findAllMovieController";
import { findMovieByTitleController } from "../controllers/findMovieByTitleController";
import * as Auth from "../api/middlewares/auth.middleware";

const router = Router();

router.post("/movieCreation", createMoviecontroller);

//post("/movieCreation", createMovie);

router.get("/findMovie", findMovieById);
router.get("/allMovie", findAllMovies);
router.get("/findMovieByTitle", findMovieByTitleController);

export default router;
