import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmployeeModule } from 'src/employees/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/employees/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), EmployeeModule],
  controllers: [AuthController],
  exports: [],
  providers: [AuthService],
})
export class AuthModule {}
