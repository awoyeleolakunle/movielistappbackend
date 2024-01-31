import { ErrorType } from "../src/constants";

export class MovieError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ErrorType.MovieError;
  }
}

export class RegistrationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ErrorType.RegistrationError;
  }
}

export class LoginError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ErrorType.LoginError;
  }
}

export interface Errors {
  MovieError: {
    name: ErrorType.MovieError;
    message: string;
  };

  RegistrationError: {
    name: ErrorType.RegistrationError;
    message: string;
  };
  LoginError: {
    name: ErrorType.RegistrationError;
    message: string;
  };
}

export class ErrorClass extends Error {
  constructor(error: ErrorType, message: Errors) {
    super(message[error].message);
    this.name = message[error].name;
  }
}
