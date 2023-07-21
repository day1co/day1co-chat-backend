import type { FastifyRequest } from 'fastify';

export type PingRequest = FastifyRequest<{
  Querystring: { name: string };
}>;
