import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGaurd } from 'src/auth/gaurds/jwt-auth.gaurd';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Request } from 'express';
import { TaskControllGaurd } from './gaurds/task-controll.gaurd';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ResponseMessageDto } from 'src/common/dto/response-message.dto';
import { Tasks } from './tasks.entity';

@Controller('/tasks')
@UseGuards(JwtAuthGaurd)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/create')
  @UseGuards(TaskControllGaurd)
  createNewTask(
    @Body() createTaskDto: CreateTaskDto,
    @Req() request: Request,
  ): Promise<ResponseMessageDto> {
    const userDetails = request['tokenUser'];
    return this.tasksService.createNewTask(createTaskDto, userDetails);
  }

  @Put('/update/:task_id')
  @UseGuards(TaskControllGaurd)
  async updateTask(
    @Param('task_id') task_id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<ResponseMessageDto> {
    return this.tasksService.updateTask(task_id, updateTaskDto);
  }

  @Get('/filter')
  async getFilteredTasks(
    @Query('assigned') assigned: string,
    @Query('status') status: string,
  ): Promise<Tasks[]> {
    return this.tasksService.getFilteredTasks({ assigned, status });
  }

  @Get()
  getAllTasks(): Promise<Tasks[]> {
    return this.tasksService.getAllTasks();
  }
}
