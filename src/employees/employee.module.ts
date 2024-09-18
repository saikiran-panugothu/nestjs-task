import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';
import { EmployeeAccessGaurd } from './gaurds/employee-access-gaurd';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  providers: [EmployeeService, EmployeeAccessGaurd],
  exports: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
