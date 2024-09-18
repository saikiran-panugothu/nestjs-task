import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teams } from './teams.entity';
import { Repository } from 'typeorm';
import { EmployeeService } from 'src/employees/employee.service';
import { ResponseMessageDto } from 'src/common/dto/response-message.dto';
import { UserDetails } from 'src/auth/dto/token-details.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Teams) private readonly teamRepo: Repository<Teams>,
    private readonly employeeService: EmployeeService,
  ) {}
  async createTeam(
    createTeamDto: CreateTeamDto,
    userDetails: UserDetails,
  ): Promise<ResponseMessageDto> {
    const employees = await this.employeeService.getAllEmployeesById(
      createTeamDto.teamMembers,
    );
    const team = this.teamRepo.create({
      team_name: createTeamDto.teamName,
      members: employees,
      created_by_name: userDetails.empName,
      created_by_id: userDetails.empId,
    });
    await this.teamRepo.save(team);
    return { status: HttpStatus.OK, message: 'Team created Successfully' };
  }

  async getAllTeams() {
    const teams = await this.teamRepo.find({
      relations: ['members'],
      select: {
        team_id: true,
        team_name: true,
        created_by_name: true,
        created_by_id: true,
        members: {
          emp_id: true,
          emp_name: true,
          emp_mail: true,
        },
      },
    });
    return teams;
  }
}
