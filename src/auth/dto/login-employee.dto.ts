import { IsNotEmpty } from 'class-validator';

export class LoginEmployeeDto {
  @IsNotEmpty({ message: 'Invalid LoginId' })
  loginId: string;

  @IsNotEmpty({ message: 'Invalid password' })
  password: string;
}
