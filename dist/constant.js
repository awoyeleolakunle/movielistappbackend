"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessage = exports.HttpStatus = void 0;
exports.HttpStatus = {
    BAD_REQUEST: 400,
    CREATED: 201,
    INTERNAL_SERVER_ERROR: 500,
};
exports.ErrorMessage = {
    MOVIE_EXISTS: 'Movie with the same title already exists',
    INTERNAL_SERVER_ERROR_MESSAGE: 'Internal Server Error',
};
