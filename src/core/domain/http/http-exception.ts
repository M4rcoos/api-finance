import { HttpException } from '@nestjs/common';
import { HttpResponse } from './http-response';

export class CustomHttpException extends HttpException {
  constructor(response: HttpResponse) {
    super(response, response.statusCode);
  }
}
