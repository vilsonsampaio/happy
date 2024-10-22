import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  password_reset_token: string;

  @Column()
  password_reset_expires: Date;
}
