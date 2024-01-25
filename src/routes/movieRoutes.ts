import { Router } from "express";
import { createMovie } from "../controllers/movieController";
import { findMovieById } from "../controllers/findMovieByIdController";
import { findAllMovies } from "../controllers/findAllMovieController";
import { findMovieByTitle } from "../controllers/findMovieByTitleController";

const router = Router();

router.post("/movieCreation", createMovie);

router.get("/findMovie", findMovieById);
router.get("/allMovie", findAllMovies);
router.get("/findMovieByTitle", findMovieByTitle);

export default router;
