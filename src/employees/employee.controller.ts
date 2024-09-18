import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { JwtAuthGaurd } from 'src/auth/gaurds/jwt-auth.gaurd';
import { Request } from 'express';
import { Employee } from './employee.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('/employees')
@UseGuards(JwtAuthGaurd)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  getAllEmps(): Promise<Employee[]> {
    return this.employeeService.getAllEmployees();
  }

  @Get('/details')
  getEmployeeFullDetails(@Req() request: Request): Promise<Employee> {
    const empId = request['tokenUser'].empId;
    return this.employeeService.getEmployeeFullDetails(empId);
  }

  @Put('/update')
  updateEmployeeDetails(
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @Req() request: Request,
  ) {
    const empId = request['tokenUser'].empId;
    return this.employeeService.updateEmployeeDetails(empId, updateEmployeeDto);
  }

  // @Get(':emp_id')
  //  @UseGuards(EmployeeAccessGaurd)
  // getEmployeeDetails(@Param('emp_id') emp_id: string) {
  //   return this.employeeService.getEmployeeFullDetails(emp_id);
  // }
}
