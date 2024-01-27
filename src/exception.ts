export class MovieError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MovieError";
  }
}

export class RegistrationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RegistrationError";
  }
}
