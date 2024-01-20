"use strict";
// movieController.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMovie = void 0;
const movieModel_1 = __importDefault(require("../models/movieModel"));
const constant_1 = require("../constant");
const exception_1 = require("../exception");
const createMovie = async (req, res) => {
    try {
        const { title, genre, director, imageUrl } = req.body;
        const existingMovie = await movieModel_1.default.findOne({ title });
        if (existingMovie) {
            throw new exception_1.MovieError(constant_1.ErrorMessage.MOVIE_EXISTS);
        }
        const newMovie = new movieModel_1.default({ title, genre, director, imageUrl });
        const savedMovie = await newMovie.save();
        res.status(constant_1.HttpStatus.CREATED).json(savedMovie);
    }
    catch (error) {
        if (error instanceof exception_1.MovieError) {
            res.status(constant_1.HttpStatus.BAD_REQUEST).json({ error: error.message });
        }
        else {
            console.log("An error occurred: ", error);
            res.status(constant_1.HttpStatus.INTERNAL_SERVER_ERROR).send(constant_1.ErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE);
        }
    }
};
exports.createMovie = createMovie;
