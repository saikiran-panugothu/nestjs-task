import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  teamName: string;

  @IsNotEmpty()
  @IsArray()
  teamMembers: string[];
}
