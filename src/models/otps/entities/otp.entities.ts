import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../../models/users/entities/user.entities';

@Entity('otp')
export class OtpEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric')
  token: number;

  @Column()
  userId: string;

  @OneToOne(() => UserEntity, (user) => user.otp, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;
}
