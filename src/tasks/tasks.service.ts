import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from './tasks.entity';
import { Repository } from 'typeorm';
import { UserDetails } from 'src/auth/dto/token-details.dto';
import { EmployeeService } from 'src/employees/employee.service';
import { ResponseMessageDto } from 'src/common/dto/response-message.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks) private readonly tasksRepo: Repository<Tasks>,
    private readonly employeeService: EmployeeService,
  ) {}
  async createNewTask(
    createTaskDto: CreateTaskDto,
    userDetails: UserDetails,
  ): Promise<ResponseMessageDto> {
    const employees = await this.employeeService.getAllEmployeesById([
      createTaskDto.assignee,
      userDetails.empId,
    ]);
    const assignee = employees.find(
      (user) => user.emp_id == createTaskDto.assignee,
    );
    const assignor = employees.find((user) => user.emp_id == userDetails.empId);
    const newTask = this.tasksRepo.create({
      description: createTaskDto.description,
      status: createTaskDto.status,
      assignee: assignee,
      assignor: assignor,
      due_date: createTaskDto.dueDate,
    });
    await this.tasksRepo.save(newTask);
    return { status: HttpStatus.OK, message: 'Task assinged Successfully' };
  }

  async updateTask(
    task_id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<ResponseMessageDto> {
    const task = await this.tasksRepo.findOne({ where: { task_id: task_id } });
    if (!task) {
      throw new BadRequestException('Task not found');
    }
    // Only update the fields provided in updateTaskDto
    Object.assign(task, updateTaskDto);
    await this.tasksRepo.save(task);
    return { status: HttpStatus.OK, message: 'Team updated Successfully' };
  }

  async getFilteredTasks(filters: {
    assigned?: string;
    status?: string;
  }): Promise<Tasks[]> {
    const queryBuilder = this.tasksRepo.createQueryBuilder('task');
    if (filters.assigned) {
      queryBuilder.andWhere('task.assignee = :assignee', {
        assignee: filters.assigned,
      });
    }
    if (filters.status) {
      queryBuilder.andWhere('task.status = :status', {
        status: filters.status,
      });
    }
    return await queryBuilder.getMany();
  }

  async getAllTasks(): Promise<Tasks[]> {
    return await this.tasksRepo.find({
      relations: ['assignee', 'assignor'],
      select: {
        task_id: true,
        description: true,
        status: true,
        due_date: true,
        assignee: {
          emp_id: true,
          emp_name: true,
        },
        assignor: {
          emp_id: true,
          emp_name: true,
        },
      },
    });
  }
}
