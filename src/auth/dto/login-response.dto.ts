import { HttpStatus } from '@nestjs/common';

export class LoginResponseDto {
  status: HttpStatus;
  message?: string;
  accessToken?: string;
}
