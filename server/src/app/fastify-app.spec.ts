import { FastifyInstance } from 'fastify';

import { getCerealConfig } from '../config';

import { init } from './fastify-app';

describe('Init fastify server instance', () => {
  let fastifyApp!: FastifyInstance;

  beforeAll(async () => {
    const serverOptions = {};
    const config = await getCerealConfig();

    fastifyApp = await init({
      serverOptions,
      cerealConnectionInfo: config.cerealConnectionInfo,
      rateLimitOptions: config.rateLimitOptions,
      swaggerOptions: config.swaggerOptions,
      swaggerUiOptions: config.swaggerUiOptions,
      typeormLoggerOptions: { useQueryLogging: false },
      gptServiceOptions: config.gptServiceOptions,
    });
  });

  afterAll(async () => {
    await fastifyApp.close();
  });

  it('should get root dot ping router in fastify app', async () => {
    const response = await fastifyApp.inject({ method: 'GET', url: '/.ping?name=hello' });
    expect(response.statusCode).toEqual(200);
    expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
    expect(response.json()).toEqual({ data: 'pong: hello', meta: {} });
  });
});
