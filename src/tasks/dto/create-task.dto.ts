import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  assignee: string;

  @IsNotEmpty()
  @IsString()
  dueDate: string;
}
