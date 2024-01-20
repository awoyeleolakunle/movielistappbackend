

import { Router } from 'express';
import { createMovie } from '../controllers/movieController';
import { findMovieById } from '../controllers/findMovieController';
import { findAllMovies } from '../controllers/findAllController';




const router = Router();

router.post('/movieCreation', createMovie);

router.get('/findMovie', findMovieById);
router.get('/allMovie', findAllMovies);
 
export default router;
