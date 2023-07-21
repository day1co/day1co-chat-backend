const env = process.env.NODE_ENV ?? 'default';
const targetCerealDatabase = env === 'local' ? 'cereal' : 'cereal_test';

module.exports = {
  env,
  log: {
    googleLoggingTrace: 'foo',
    featureFlag: {
      useApiPerfLog: 'foo',
    },
  },
  db: {
    knex: {
      connection: {
        host: 'localhost',
        port: 8080,
        user: 'root',
        password: 'root',
        database: 'cereal',
        charset: 'utf8mb4',
        timezone: 'Z',
        decimalNumbers: true,
      },
    },
  },
  server: {
    host: 'http://127.0.0.1:8080',
  },
  gptService: {
    upstage: { host: '' },
    open_ai: {
      host: 'https://api.openai.com/v1',
      key: '',
    },
  },
  database: {
    client: 'mysql2',
    primary: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'cereal',
      charset: 'utf8mb4',
      timezone: 'Z',
      decimalNumbers: true,
    },
    cereal: {
      mysql: {
        primary: {
          client: 'mysql2',
          connection: {
            host: '127.0.0.1',
            port: 3306,
            database: targetCerealDatabase,
            user: 'root',
            password: 'root',
            charset: 'utf8mb4',
            timezone: 'Z',
            decimalNumbers: true,
          },
        },
      },
    },
  },
  cache: {
    redis: {
      host: 'localhost',
      db: 0,
      port: 6379,
    },
  },
  bus: {
    redis: {
      host: 'localhost',
      db: 0,
      port: 6379,
    },
  },
  auth: {
    staff: {
      ldap: {
        url: '',
      },
    },
    kakao: {
      plusFriend: 'foo',
    },
  },
};
