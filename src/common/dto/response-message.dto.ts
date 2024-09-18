import { HttpStatus } from '@nestjs/common';

export class ResponseMessageDto {
  status: HttpStatus;
  message: string;
}
