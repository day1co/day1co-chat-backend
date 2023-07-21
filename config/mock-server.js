// eslint-disable-next-line @typescript-eslint/no-var-requires
const { join } = require('node:path');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { startMockServer } = require('@day1co/spring-cloud-config-client');

const [, , rootDir = '.'] = process.argv;
const configFile = 'mock-config-fixture.js';

startMockServer(join(rootDir, configFile));
