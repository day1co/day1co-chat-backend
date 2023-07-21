module.exports = {
  testEnvironment: 'node',
  moduleNameMapper: {
    '@api/(.*)': '<rootDir>/build/api/$1',
    '@entity/(.*)': '<rootDir>/build/entity/$1',
    '@data-source': '<rootDir>/build/data-source/index.js',
    '@server': '<rootDir>/build/server.js',
  },
};
