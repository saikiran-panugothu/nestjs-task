import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class EmployeeAccessGaurd implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const empId = request.params['emp_id'];
    const userDetails = request['tokenUser'];
    if (userDetails.empId != empId)
      throw new UnauthorizedException(
        `user don't have access to view other employee details`,
      );
    return true;
  }
}
