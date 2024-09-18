import { Teams } from 'src/teams/teams.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;
}
