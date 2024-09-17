import {
  Column,
  CreateDateColumn,
  Entity,
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

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;
}
