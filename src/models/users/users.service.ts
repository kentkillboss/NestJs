import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity } from './entities/user.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { UserDTO, UserRO } from './dto/user.dto';
import { plainToClass } from 'class-transformer';
import { OtpEntity } from '../otps/entities/otp.entities';
import { OtpRepository } from '../otps/otps.repository';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: UserRepository,
    @InjectRepository(OtpEntity)
    private otpRepository: OtpRepository,
    private mailService: MailerService,
  ) {}

  async showAll(): Promise<UserDTO[]> {
    const users = await this.userRepository.find({});
    return users.map((user) =>
      plainToClass(UserDTO, user, { excludeExtraneousValues: true }),
    );
  }

  async getUserById(id: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    // const user = await this.userRepository.findOne({
    //   where: {
    //     id,
    //   },
    //   relations: ['otp'],
    // });

    return plainToClass(UserRO, user, { excludeExtraneousValues: true });
  }

  async updateUser(id: string, userData: any): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const newUser = this.userRepository.save({
      id,
      ...userData,
    });

    return plainToClass(UserDTO, newUser, { excludeExtraneousValues: true });
  }

  async deleteUser(id: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.userRepository.delete(id);
    } catch (error) {
      return new HttpException('Delete faild', HttpStatus.BAD_REQUEST);
    }
  }

  async sendOtp(email: any): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        ...email,
      },
    });

    if (!user) {
      throw new HttpException('Email not found', HttpStatus.BAD_REQUEST);
    }

    const { id } = user;

    const randOtp = Math.floor(Math.random() * (9999 - 1000)) + 1000;

    const otp = this.otpRepository.create({ token: randOtp, userId: id });

    await this.mailService.sendMail({
      to: email.email,
      from: 'thanhlesy.devplus@gmail.com',
      subject: 'Send OTP',
      text: `This is your OTP: ${randOtp}`,
    });

    await this.otpRepository.save(otp);

    return {
      message: 'Send Otp successfully',
    };
  }

  async newPasswordByOtp(data: any) {
    const token = await this.otpRepository.findOne({
      where: {
        token: data.otp,
      },
      relations: ['user'],
    });

    if (!token) {
      throw new HttpException('Otp invalid', HttpStatus.BAD_REQUEST);
    }

    const { id, userId } = token;

    const newUser = this.userRepository.create({
      id: userId,
      password: data.password,
    });

    await this.userRepository.save(newUser);

    await this.otpRepository.delete(id);

    return plainToClass(UserDTO, newUser, { excludeExtraneousValues: true });
  }
}
