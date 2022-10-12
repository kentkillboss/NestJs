import { UserEntity } from './entities/user.entities';
import { Repository } from 'typeorm';
import dataSourceConfig from 'src/config/data-source.config';

export class UserRepository extends Repository<UserEntity> {
  constructor() {
    super(UserEntity, dataSourceConfig.manager);
  }
}
