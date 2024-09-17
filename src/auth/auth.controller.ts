import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Employee } from 'src/employees/employee.entity';
import { CreateEmployeeDto } from 'src/employees/dto/create-employee.dto';
import { EmployeeService } from 'src/employees/employee.service';
import { LoginEmployeeDto } from './dto/login-employee.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly employeeService: EmployeeService,
  ) {}

  @Post('/signup')
  async employeeSignUp(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    const employee = await this.employeeService.addUser(createEmployeeDto);
    return employee;
  }

  @Post('/login')
  async employeeLogin(@Body() loginEmployeeDto: LoginEmployeeDto) {
    return this.authService.employeeLogin(loginEmployeeDto);
  }
}
