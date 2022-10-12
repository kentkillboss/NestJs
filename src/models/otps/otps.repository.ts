import { Repository } from 'typeorm';
import dataSourceConfig from 'src/config/data-source.config';
import { OtpEntity } from './entities/otp.entities';

export class OtpRepository extends Repository<OtpEntity> {
  constructor() {
    super(OtpEntity, dataSourceConfig.manager);
  }
}
