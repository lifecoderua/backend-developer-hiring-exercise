import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { APISafeException } from './apiexception';


/**
 * An exception filter that echoes back safe errors from deeper in the application over the API.
 */
@Catch(APISafeException)
export class APIHttpExceptionFilter implements ExceptionFilter {
  catch(exception: APISafeException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = 500;

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        errorMessage: exception.message 
      });
  }
}