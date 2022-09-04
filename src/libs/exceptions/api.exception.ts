import { HttpException } from '@nestjs/common';

export class ApiException extends HttpException {
  constructor(response: string | Record<string, any>, statusCode: number) {
    super(response, statusCode);
  }
}
