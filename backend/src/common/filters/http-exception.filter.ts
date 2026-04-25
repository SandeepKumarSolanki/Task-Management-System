import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';

import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: unknown, host: ArgumentsHost){

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const res: any = exception.getResponse();
        message =
        typeof res === 'string'
          ? res
          : res.message || res.error;
    }

    if (!(exception instanceof HttpException)) {
      console.error(exception);
    }

    //Throttler Error(CUSTOM MESSAGE)
    if (exception instanceof ThrottlerException) {
      status = HttpStatus.TOO_MANY_REQUESTS;
      message = 'Too many requests. Please wait a moment and try again.';
    }

    response.status(status).json({
      success: false,
      status: status,
      message:
        status === 404
          ? 'The API endpoint you are trying to access does not exist.'
          : message,
      // path: request.url,
    //   timestamp: new Date().toISOString(),
    });
    
  }
}