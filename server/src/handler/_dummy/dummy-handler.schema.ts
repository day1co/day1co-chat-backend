import type { FastifySchema } from 'fastify';

export const pingGetSchema: FastifySchema = {
  tags: ['DUMMY'],
  summary: 'xxx',
  description: 'yyy',
  querystring: {
    type: 'object',
    properties: { name: { type: 'string' } },
    required: ['name'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: { type: 'string' },
        meta: { type: 'object' },
      },
    },
  },
};
