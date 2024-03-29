import { Application } from "express";
import { HttpStatus } from "./constants";

export enum Http {
  CREATED = "CREATED",
  OK = "OK",
  BAD_REQUEST = "BAD_REQUEST",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  UNAUTHORIZED_ACCESS = "UNAUTHORIZED_ACCESS",
}

export class ApiResponse<T> {
  constructor(
    public data: T,
    public http: Http,
    public status: number,
    public isSuccessful: boolean
  ) {
    this.data = data;
    this.http = http;
    this.status = status;
    this.isSuccessful = isSuccessful;
  }
}

export class GenerateApiResponse {
  static returnCreatedResponse<T extends String>(data: T): ApiResponse<T> {
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
  static returnUnauthoriseAccessResponse<T extends string>(
    data: T
  ): ApiResponse<T> {
    return new ApiResponse(
      data,
      Http.UNAUTHORIZED_ACCESS,
      HttpStatus.UNAUTHORIZED_ACCESS,
      false
    );
  }
}
