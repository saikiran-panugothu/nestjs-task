import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { In, Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

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

  async updateEmployeeDetails(
    empId: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ) {
    const employee = await this.employeeRepo.findOne({
      where: { emp_id: empId },
    });
    if (updateEmployeeDto.empName) {
      employee.emp_name = updateEmployeeDto.empName;
    }
    if (updateEmployeeDto.empMail) {
      employee.emp_mail = updateEmployeeDto.empMail;
    }
    if (updateEmployeeDto.empLoginId) {
      throw new BadRequestException('LoginId cannot be updated');
    }
    if (updateEmployeeDto.empPassword) {
      const hashedPassword = await hash(updateEmployeeDto.empPassword, 10);
      employee.emp_password = hashedPassword;
    }
    Object.assign(employee, updateEmployeeDto);
    await this.employeeRepo.save(employee);
    return { status: HttpStatus.OK, message: 'Employee updated Successfully' };
  }

  async getEmployeeFullDetails(empId: string) {
    return await this.employeeRepo.findOne({
      where: { emp_id: empId },
      relations: ['teams', 'assigned_tasks'],
      select: {
        emp_id: true,
        emp_name: true,
        emp_login_id: true,
        emp_mail: true,
        teams: {
          team_id: true,
          team_name: true,
        },
        assigned_tasks: {
          task_id: true,
          description: true,
          status: true,
          due_date: true,
        },
      },
    });
  }

  async getAllEmployees() {
    return await this.employeeRepo.find();
  }

  async getEmployeeById(employeeId: string): Promise<Employee> {
    return await this.employeeRepo.findOne({
      where: { emp_id: employeeId },
      relations: ['teams'],
    });
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
