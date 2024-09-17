import { HttpStatus, Injectable } from '@nestjs/common';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/employees/employee.entity';
import { Repository } from 'typeorm';
import { EmployeeService } from 'src/employees/employee.service';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { TokenPayLoadDto } from './dto/token-payload.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
    private readonly employeeService: EmployeeService,
  ) {}

  async employeeLogin(
    loginEmployeeDto: LoginEmployeeDto,
  ): Promise<LoginResponseDto> {
    const userFound = await this.employeeService.getEmployeeByLoginId(
      loginEmployeeDto.loginId,
    );
    if (!userFound)
      return { status: HttpStatus.NOT_FOUND, message: 'User not found' };

    const isValidPassword = await compare(
      loginEmployeeDto.password,
      userFound.emp_password,
    );
    if (!isValidPassword)
      return {
        status: HttpStatus.UNAUTHORIZED,
        message: 'Invalid Credentials',
      };
    const tokenPayload: TokenPayLoadDto = {
      empId: userFound.emp_id,
      empName: userFound.emp_name,
      empLoginId: userFound.emp_login_id,
      createdAt: userFound.created_at.toString(),
    };
    const accessToken = this.generateJwtToken(tokenPayload);
    return { status: HttpStatus.OK, accessToken: accessToken };
  }

  generateJwtToken(payLoad: TokenPayLoadDto): string {
    return sign(payLoad, process.env.JWT_SECRECT_KEY, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });
  }
}
