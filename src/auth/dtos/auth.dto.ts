import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}

export class AuthRO {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  token?: string;
}
