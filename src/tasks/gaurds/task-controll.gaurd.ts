import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { EmployeeService } from 'src/employees/employee.service';

@Injectable()
export class TaskControllGaurd implements CanActivate {
  constructor(private readonly employeeService: EmployeeService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const assignor = request['tokenUser'];
    const assigneeId = request.body.assignee;
    const assignorEmployee = await this.employeeService.getEmployeeById(
      assignor.empId,
    );
    const assigneeEmployee =
      await this.employeeService.getEmployeeById(assigneeId);
    if (!assignorEmployee || !assigneeEmployee) {
      throw new ForbiddenException('Assignor or Assignee not found');
    }

    // Check if the assignee is part of any team that the assignor is a member of
    const isAssigneeInSameTeam = assignorEmployee.teams.some((assignorTeam) =>
      assigneeEmployee.teams.some(
        (assigneeTeam) => assigneeTeam.team_id == assignorTeam.team_id,
      ),
    );

    if (!isAssigneeInSameTeam) {
      throw new ForbiddenException(
        'Assignee is not part of the assignor’s team',
      );
    }
    return true;
  }
}
