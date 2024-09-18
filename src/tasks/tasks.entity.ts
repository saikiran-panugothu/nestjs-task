import { Employee } from 'src/employees/employee.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  task_id: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @ManyToOne(() => Employee, (employee) => employee.assigned_tasks)
  assignee: Employee;

  @ManyToOne(() => Employee, (employee) => employee.created_tasks)
  assignor: Employee;

  @Column()
  due_date: string;

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;
}
