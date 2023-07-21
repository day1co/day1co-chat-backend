import { startServer } from './fastify-server';

startServer().catch((reject: unknown) => {
  // eslint-disable-next-line no-console
  console.error(reject);
});
