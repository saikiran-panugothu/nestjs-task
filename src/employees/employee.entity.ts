import { Tasks } from 'src/tasks/tasks.entity';
import { Teams } from 'src/teams/teams.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  emp_id: string;

  @Column()
  emp_name: string;

  @Column({ unique: true })
  emp_login_id: string;

  @Column()
  emp_password: string;

  @Column()
  emp_mail: string;

  @ManyToMany(() => Teams, (teams) => teams.members)
  @JoinTable({ name: 'employee_teams' })
  teams: Teams[];

  @OneToMany(() => Tasks, (tasks) => tasks.assignee)
  assigned_tasks: Tasks[];

  @OneToMany(() => Tasks, (tasks) => tasks.assignor)
  created_tasks: Tasks[];

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;
}
