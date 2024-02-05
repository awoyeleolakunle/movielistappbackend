export const HttpStatus = {
  BAD_REQUEST: 400,
  CREATED: 201,
  INTERNAL_SERVER_ERROR: 500,
  OK: 200,
  UNAUTHORIZED_ACCESS: 401,
};

export enum ErrorType {
  MovieError = "MovieError",
  RegistrationError = "RegistrationError",
  LoginError = "LoginError",
  UserError = "UserError",
}

export enum SuccessMessage {
  MOVIE_ADDED_SUCESSFULLY = "Movie added successfuly",
}
