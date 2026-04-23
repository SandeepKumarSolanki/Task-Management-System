import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

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

    response.status(status).json({
      success: false,
      statusCode: status,
      message:
        status === 404
          ? 'The API endpoint you are trying to access does not exist.'
          : message,
      // path: request.url,
    //   timestamp: new Date().toISOString(),
    });
    
  }
}