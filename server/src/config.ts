import { type Config, getConfig } from '@day1co/spring-cloud-config-client';

import type { RateLimitOptions } from '@fastify/rate-limit';
import type { SwaggerOptions } from '@fastify/swagger';
import type { FastifySwaggerUiOptions } from '@fastify/swagger-ui';

const application = process.env.SPRING_CLOUD_CONFIG_NAME || 'cereal';
const profile: string =
  (process.env.SPRING_CLOUD_CONFIG_PROFILE || process.env.D1_ENV) ?? process.env.NODE_ENV ?? 'default';
const endpoint: string =
  process.env.SPRING_CLOUD_CONFIG_URI || process.env.REDSTONE_CONFIG_URL || 'http://config.example.com';
const label = process.env.SPRING_CLOUD_CONFIG_LABEL;

export async function getCerealConfig() {
  const config: Config = await getConfig({ endpoint, application, profile, label });
  const database: any = config.getByKey('database');
  const cache: any = config.getByKey('cache');
  const gptServiceOptions: any = config.getByKey('gptService');

  const RateLimitMaxConcurrent = 100;
  const RateLimitTimeWindowInMS = 500;

  const rateLimitOptions: RateLimitOptions = {
    max: RateLimitMaxConcurrent,
    timeWindow: RateLimitTimeWindowInMS,
  };

  const swaggerOptions: SwaggerOptions = {
    openapi: {
      info: { title: 'Cereal documents by swagger', description: 'Testing the Fastify swagger API', version: '0.1.0' },
      components: { securitySchemes: { apiKey: { type: 'apiKey', name: 'accessToken', in: 'header' } } },
    },
    hideUntagged: false,
  };
  const swaggerUiOptions: FastifySwaggerUiOptions = {
    routePrefix: '/_docs',
  };

  const serviceHost = '0.0.0.0';
  const servicePort = Number(process.env.PORT ?? 8080);

  const cerealConnectionInfo: any = {
    mysql: database.cereal.mysql.primary,
    mysqlReplica: database.cereal.mysql.primary,
    redis: cache.redis,
  };

  const useTypeormLogging = true;

  return {
    rateLimitOptions,
    swaggerOptions,
    swaggerUiOptions,
    serviceHost,
    servicePort,
    cerealConnectionInfo,
    useTypeormLogging,
    gptServiceOptions,
  };
}
