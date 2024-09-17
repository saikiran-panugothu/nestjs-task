import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';

@Controller()
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('/emps')
  getAllEmps() {
    return this.employeeService.getallemp();
  }
}
