import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmployeeModule } from 'src/employees/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/employees/employee.entity';
import { JwtAuthGaurd } from './gaurds/jwt-auth.gaurd';

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), EmployeeModule],
  controllers: [AuthController],
  exports: [JwtAuthGaurd],
  providers: [AuthService, JwtAuthGaurd],
})
export class AuthModule {}
