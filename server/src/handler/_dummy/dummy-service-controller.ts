import { pingGetSchema } from './dummy-handler.schema';

import type { PingRequest } from './dummy-handler.type';
import type { FastifyInstance, FastifyReply, RegisterOptions } from 'fastify';

// XXX: it should be worked 'FastifyRegisterOptions<{ rbacService: RbacService }>'
// xxx: override type info
type FastifyRegisterOptions<Options> = RegisterOptions & Options;

export const _pingService = {
  method1: async (name: string) => {
    return `pong: ${name}`;
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const dummyHandler = (_: unknown) => {
  return async function (request: PingRequest, reply: FastifyReply) {
    const query = request.query.name;
    try {
      const result = await _pingService.method1(query);

      reply.send({ data: result, meta: request.headers });
    } catch (err) {
      // console.error(err);
      // todo: specify errors
      reply.internalServerError();
    }
  };
};

export async function _pingServiceController(
  fastify: FastifyInstance,
  opts: FastifyRegisterOptions<{ pingService: unknown }>
) {
  const pingService = opts.pingService;

  fastify.get('/.ping', { schema: pingGetSchema }, dummyHandler(pingService));
}
