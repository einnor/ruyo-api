import httpStatus from 'http-status';
import { Request, Response } from 'express';

export default class Api {
  static unauthorized(
    request: Request,
    response: Response,
    responseData: any,
  ): Response {
    response.statusCode = httpStatus.UNAUTHORIZED;
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

  static internalError(
    request: Request,
    response: Response,
    responseData: any,
  ): Response {
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

    return response.status(httpStatus.INTERNAL_SERVER_ERROR).json(responseData);
  }

  static badRequest(
    request: Request,
    response: Response,
    responseData: string | object,
  ): Response {
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
    responseData: string | object,
  ): Response {
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
  ): Response {
    const errorMessage = error.toString();

    // Otherwise, return 500 (internal server error)
    return Api.internalError(request, response, errorMessage);
  }
}
