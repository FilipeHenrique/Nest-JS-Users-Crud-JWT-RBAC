import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../enums/role.enums';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id?: number;

  @Column({
    length: 63,
  })
  name: string;

  @Column({
    length: 127,
    unique: true,
  })
  email: string;

  @Column({
    length: 200,
  })
  password: string;

  @CreateDateColumn({
    type: 'date',
    nullable: true,
  })
  birthAt?: Date;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({
    default: Role.User,
    enum: [1, 2],
  })
  role: number;
}
