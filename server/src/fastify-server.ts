import { LoggerFactory } from '@day1co/pebbles';

import { init } from './app';
import { getCerealConfig } from './config';

import type { ApplicationInitParams } from './app/fastify-app.type';

const logger = LoggerFactory.getLogger('cereal:fastify-server');

export async function startServer() {
  const config = await getCerealConfig();

  const initOptions: ApplicationInitParams = {
    serverOptions: {},
    cerealConnectionInfo: config.cerealConnectionInfo,
    rateLimitOptions: config.rateLimitOptions,
    swaggerOptions: config.swaggerOptions,
    swaggerUiOptions: config.swaggerUiOptions,
    typeormLoggerOptions: { useQueryLogging: config.useTypeormLogging },
    gptServiceOptions: config.gptServiceOptions,
  };

  const app = await init(initOptions);

  app.listen({ host: config.serviceHost, port: config.servicePort }, (err, address) => {
    if (err) {
      // console.error(err);
      process.exit(1);
    }

    logger.info('fastify server is open in %s with routes ', address);
    // console.log(app.printRoutes());
  });
  return app;
}
