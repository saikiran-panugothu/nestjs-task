import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  empName: string;

  @IsNotEmpty()
  empLoginId: string;

  @IsNotEmpty()
  empPassword: string;

  @IsNotEmpty()
  @IsEmail()
  empMail: string;
}
