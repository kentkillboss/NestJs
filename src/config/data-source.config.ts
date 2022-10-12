import { environment } from '../common/constant/environment';
import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

export default new DataSource({
  type: 'postgres',
  replication: {
    master: {
      database: environment.database.database,
      username: environment.database.username,
      password: environment.database.password,
      port: +(environment.database.port || 0),
      host: environment.database.host,
    },
    slaves: [
      {
        database: environment.database.database,
        username: environment.database.username,
        password: environment.database.password,
        port: +(environment.database.port || 0),
        host: environment.database.host,
      },
    ],
  },
  entities: [join(__dirname, '..', '**', '**', '**', '*.entities.{ts,js}')],
  migrations: [join(__dirname, '..', 'database', 'migrations', '*{.ts,.js}')],
  synchronize: true,
  logging: false,
} as DataSourceOptions);
