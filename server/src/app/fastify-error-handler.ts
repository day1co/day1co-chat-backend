import { LoggerFactory } from '@day1co/pebbles';
import { FastifyError, FastifyRequest } from 'fastify';

const logger = LoggerFactory.getLogger('cereal:server:');
export const errorHandler = (error: FastifyError, req: FastifyRequest) => {
  if (error instanceof Error) {
    logger.error(`route: ${req.routerMethod} ${req.routerPath}, message: ${error.message}`);
  }
  throw error;
};
