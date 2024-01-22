import { Router } from "express";
import { createMovie } from "../controllers/movieController";
import { findMovieById } from "../controllers/findMovieController";
import { findAllMovies } from "../controllers/findAllMovieController";
import { findMovieByTitle } from "../controllers/findMovieController";

const router = Router();

router.post("/movieCreation", createMovie);

router.get("/findMovie", findMovieById);
router.get("/allMovie", findAllMovies);
router.get("/findMovieByTitle", findMovieByTitle);

export default router;
