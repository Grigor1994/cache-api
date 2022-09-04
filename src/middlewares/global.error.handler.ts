import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Request, Response } from 'express';
import { ApiException } from '../libs/exceptions';

@Catch()
export class GlobalErrorHandler implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let responseBody: Record<string, any> = { message: error.message };

    if (!(error instanceof ApiException)) {
      if (error instanceof UnauthorizedException) {
        Logger.warn('User unauthorized', {
          error,
          ip: request.ip,
        });
      } else {
        Logger.error(
          `Global error handler, message: ${error.message}`,
          error.stack,
          {
            url: request.url,
            error: error,
          },
        );
      }
    }

    if (error instanceof HttpException) {
      status = error.getStatus();
      const errorResponse = error.getResponse();

      responseBody =
        typeof errorResponse === 'object'
          ? errorResponse
          : { message: errorResponse };
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      ...responseBody,
    });
  }
}
