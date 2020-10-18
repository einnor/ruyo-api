import httpStatus from 'http-status';
import { Request, Response } from 'express';

export default class Api {
  static internalError(
    request: Request,
    response: Response,
    responseData: any,
  ) {
    response = response.status(httpStatus.INTERNAL_SERVER_ERROR);

    if (typeof responseData === 'string') {
      return response.json({
        error: responseData,
      });
    }
    if (typeof responseData === 'object') {
      const messageOrError = responseData['message'] || responseData['error'];
      if (messageOrError) {
        return response.json({
          error: messageOrError,
        });
      }
    }

    return response.json(responseData);
  }

  static badRequest(request: Request, response: Response, responseData: any) {
    response.statusCode = httpStatus.BAD_REQUEST;

    if (typeof responseData === 'string') {
      return response.json({
        error: responseData,
      });
    } else {
      return response.json(responseData);
    }
  }

  static unprocessableEntity(
    request: Request,
    response: Response,
    responseData: any,
  ) {
    response.statusCode = httpStatus.UNPROCESSABLE_ENTITY;

    if (typeof responseData === 'string') {
      return response.json({
        error: responseData,
      });
    } else {
      return response.json(responseData);
    }
  }

  static handleUncaughtException(
    error: Error,
    request: Request,
    response: Response,
  ) {
    const errorMessage = error.toString();

    // Otherwise, return 500 (internal server error)
    return Api.internalError(request, response, errorMessage);
  }
}
