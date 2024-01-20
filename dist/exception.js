"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieError = void 0;
class MovieError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MovieError';
    }
}
exports.MovieError = MovieError;
