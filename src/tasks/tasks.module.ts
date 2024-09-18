import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './tasks.entity';
import { EmployeeModule } from 'src/employees/employee.module';
import { TaskControllGaurd } from './gaurds/task-controll.gaurd';

@Module({
  imports: [AuthModule, EmployeeModule, TypeOrmModule.forFeature([Tasks])],
  exports: [],
  providers: [TasksService, TaskControllGaurd],
  controllers: [TasksController],
})
export class TasksModule {}
