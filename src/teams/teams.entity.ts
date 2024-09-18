import { Employee } from 'src/employees/employee.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Teams {
  @PrimaryGeneratedColumn()
  team_id: string;

  @Column()
  team_name: string;

  @ManyToMany(() => Employee, (employee) => employee.teams)
  members: Employee[];

  @Column()
  created_by_name: string;

  @Column()
  created_by_id: string;

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;
}
