import type { RateLimitOptions } from '@fastify/rate-limit';
import type { SwaggerOptions } from '@fastify/swagger';
import type { FastifySwaggerUiOptions } from '@fastify/swagger-ui';
import type { FastifyServerOptions } from 'fastify';

export type ApplicationInitParams = {
  serverOptions: FastifyServerOptions;
  cerealConnectionInfo: any;
  rateLimitOptions?: RateLimitOptions;
  swaggerOptions?: SwaggerOptions;
  swaggerUiOptions?: FastifySwaggerUiOptions;
  typeormLoggerOptions?: { useQueryLogging: boolean };
  gptServiceOptions?: any;
};
