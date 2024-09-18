import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { In, Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
  ) {}

  async addUser(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> | null {
    const userFound = await this.getEmployeeByLoginId(
      createEmployeeDto.empLoginId,
    );
    if (userFound)
      throw new BadRequestException('User with loginId already exists');
    const hashedPassword = await hash(createEmployeeDto.empPassword, 10);
    const employee = this.employeeRepo.create({
      emp_name: createEmployeeDto.empName,
      emp_login_id: createEmployeeDto.empLoginId,
      emp_password: hashedPassword,
      emp_mail: createEmployeeDto.empMail,
    });
    let createdEmployee = await this.employeeRepo.save(employee);
    delete employee.emp_password;
    delete employee.updated_at;
    return createdEmployee;
  }

  //TODO -> write proper route
  async getallemp() {
    return await this.employeeRepo.find();
  }

  async getEmployeeByLoginId(empLoginId: string): Promise<Employee> | null {
    const employeeDetails = await this.employeeRepo.findOneBy({
      emp_login_id: empLoginId,
    });
    return employeeDetails;
  }

  async getAllEmployeesById(empIds: string[]): Promise<Employee[]> {
    const employeeArray = await this.employeeRepo.findBy({
      emp_id: In(empIds),
    });
    if (employeeArray.length !== empIds.length)
      throw new BadRequestException('One or more Employee Id is not found');
    return employeeArray;
  }
}
