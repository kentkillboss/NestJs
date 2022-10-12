import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { OtpRO } from 'src/models/otps/dtos/otp.dto';

export class UserDTO {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  username: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  role: string;
}

export class UpdateUserDTO {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  username: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  email: string;
}

export class UserRO {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  username: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  role: string;

  @ApiProperty()
  @Type(() => OtpRO)
  @Expose()
  otp: OtpRO;
}
