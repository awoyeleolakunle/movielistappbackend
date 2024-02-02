import { ErrorType } from "../src/constants";

export interface Errors {
  name: ErrorType;
  message: string;
}

export class ErrorClass extends Error {
  constructor(message: Errors) {
    super(message.message);
    this.name = message.name;
  }
}
