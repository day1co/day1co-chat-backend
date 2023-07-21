module.exports = {
  preset: 'ts-jest',
  maxConcurrency: 1,
  roots: ['./src'],
  testEnvironment: 'node',
  testTimeout: 20000,
};
