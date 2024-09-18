import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';
import { JwtAuthGaurd } from 'src/auth/gaurds/jwt-auth.gaurd';
import { EmployeeAccessGaurd } from './gaurds/employee-access-gaurd';

@Controller('/employees')
@UseGuards(JwtAuthGaurd)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  getAllEmps() {
    return this.employeeService.getAllEmployees();
  }

  @Get(':emp_id')
  @UseGuards(EmployeeAccessGaurd)
  getEmployeeFullDetails(@Param('emp_id') emp_id: string) {
    return this.employeeService.getEmployeeFullDetails(emp_id);
  }
}
