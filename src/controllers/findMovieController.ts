
import { Response, Request } from 'express';
import Movie, {MovieModel} from '../models/movieModel';
import { MovieError } from '../exception';
import { ErrorMessage, HttpStatus } from '../constant';
import mongoose from 'mongoose';







export const findMovieById = async (req: Request, res: Response)=>{

    try {
    
        const id = req.query.id as string;

        console.log("I'm the id ", id);

        const hardcodedId = '65abd15c29232dd9f8a4ea30'


    if (!mongoose.Types.ObjectId.isValid(id)) {
        // Handle invalid ID
        res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid Movie ID' });
        return;
      }

    const foundMovie : MovieModel | null = await Movie.findById(hardcodedId);

    if(foundMovie === null){
        throw new MovieError(ErrorMessage.MOVIE_NOT_FOUND)  
      }

    res.status(HttpStatus.OK).json(foundMovie);
    }
    catch(error){

        if (error instanceof MovieError) {
            res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
          } else {
            console.log("An error occurred: ", error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(ErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE);
          }

    }

} 