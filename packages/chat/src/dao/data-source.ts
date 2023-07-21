import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export function mysqlDataSource(options) {
  return new DataSource({
    synchronize: false,
    type: 'mysql',
    logging: options.useLogging ?? false,
    replication: {
      master: {
        host: options.connectionInfo.mysql.connection.host,
        port: options.connectionInfo.mysql.connection.port,
        username: options.connectionInfo.mysql.connection.user,
        password: options.connectionInfo.mysql.connection.password,
        database: options.connectionInfo.mysql.connection.database,
      },
      slaves: [
        {
          host: options.connectionInfo.mysqlReplica.connection.host,
          port: options.connectionInfo.mysqlReplica.connection.port,
          username: options.connectionInfo.mysqlReplica.connection.user,
          password: options.connectionInfo.mysqlReplica.connection.password,
          database: options.connectionInfo.mysqlReplica.connection.database,
        },
      ],
    },
    entities: options.entities,
    namingStrategy: new SnakeNamingStrategy(),
  });
}
