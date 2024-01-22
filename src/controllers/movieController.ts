import { Request, Response } from "express";
import Movie, { MovieModel } from "../models/movieModel";
import { HttpStatus, ErrorMessage } from "../constant";
import { MovieError } from "../exception";

export const createMovie = async (req: Request, res: Response) => {
  try {
    const { title, genre, director, imageUrl } = req.body;
    const existingMovie = await Movie.findOne({ title });

    if (existingMovie) {
      throw new MovieError(ErrorMessage.MOVIE_EXISTS);
    }

    const newMovie: MovieModel = new Movie({
      title,
      genre,
      director,
      imageUrl,
    });
    const savedMovie = await newMovie.save();
    res.status(HttpStatus.CREATED).json(savedMovie);
  } catch (error) {
    if (error instanceof MovieError) {
      res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
    } else {
      console.log("An error occurred: ", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(ErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }
};
