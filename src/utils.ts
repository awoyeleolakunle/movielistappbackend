import { Application } from "express";
import { HttpStatus } from "./constants";

export enum Http {
  CREATED = "CREATED",
  OK = "OK",
  BAD_REQUEST = "BAD_REQUEST",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export class ApiResponse<T> {
  public data: T;
  public http: Http;
  public status: number;
  public isSuccessful: boolean;

  constructor(data: T, http: Http, status: number, isSucessful: boolean) {
    this.data = data;
    this.http = http;
    this.status = status;
    this.isSuccessful = isSucessful;
  }
}

export class GenerateApiResponse {
  static returnCreatedResponse<T>(data: T): ApiResponse<T> {
    return new ApiResponse(data, Http.CREATED, HttpStatus.CREATED, true);
  }

  static returnBadRequestResponse<T>(data: T): ApiResponse<T> {
    return new ApiResponse(
      data,
      Http.BAD_REQUEST,
      HttpStatus.BAD_REQUEST,
      false
    );
  }

  static returnOkResponse<T>(data: T): ApiResponse<T> {
    return new ApiResponse(data, Http.OK, HttpStatus.OK, true);
  }

  static returnInternalServerErrorResponse<T>(data: T): ApiResponse<T> {
    return new ApiResponse(
      data,
      Http.INTERNAL_SERVER_ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR,
      false
    );
  }
}
