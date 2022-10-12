import { Expose } from 'class-transformer';

export class OtpRO {
  @Expose()
  id: string;

  @Expose()
  token: number;

  @Expose()
  userId: string;
}
