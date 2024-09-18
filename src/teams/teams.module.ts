import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teams } from './teams.entity';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { EmployeeModule } from 'src/employees/employee.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Teams]), EmployeeModule, AuthModule],
  exports: [],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamModule {}
