import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Role } from '../../../common/helpers/roles.enum';
import { OtpEntity } from '../../../models/otps/entities/otp.entities';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    unique: true,
  })
  name: string;

  @Column({
    type: 'text',
    unique: true,
  })
  username: string;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @Column('text')
  password: string;

  @OneToOne(() => OtpEntity, (otp) => otp.user)
  otp: OtpEntity;

  @CreateDateColumn()
  created: Date;

  @BeforeUpdate()
  async hasPasswordUpdate() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeInsert()
  async hasPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  get token() {
    const { id, username, role } = this;
    return jwt.sign(
      {
        id,
        username,
        role,
      },
      process.env.SECRET,
      { expiresIn: '7d' },
    );
  }
}
