

import { Router } from 'express';
import { createMovie } from '../controllers/movieController';
import { findMovieById } from '../controllers/findMovieController';




const router = Router();

router.post('/movieCreation', createMovie);

router.get('/findMovie', findMovieById);
 
export default router;
