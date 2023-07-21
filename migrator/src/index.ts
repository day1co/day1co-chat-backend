import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import type { DataSourceOptions } from 'typeorm';

const mysqlDataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'cereal',
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  migrations: [__dirname + '/migrations/*.js'],
};

export default new DataSource(mysqlDataSourceOptions);
