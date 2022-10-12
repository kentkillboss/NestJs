import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entities';
import { OtpEntity } from '../otps/entities/otp.entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, OtpEntity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
