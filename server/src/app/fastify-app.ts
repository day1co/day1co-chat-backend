import {
  ChatMessageEntity,
  ChatEntity,
  ChatContextEntity,
  ChatService,
  ChatServiceFactory,
  GptService,
  UpstageService,
  OpenAIService,
  mysqlDataSource,
} from '@day1co/cereal-chat';
import fastifyMultipart from '@fastify/multipart';
import fastifyRateLimit from '@fastify/rate-limit';
import fastifySensible from '@fastify/sensible';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import Fastify, { type FastifyInstance } from 'fastify';

import { DataSource } from 'typeorm';
import { _pingService, _pingServiceController } from '../handler';

import { chatServiceController } from '../handler/chat/chat-service-controller';
import { errorHandler } from './fastify-error-handler';
import type { ApplicationInitParams } from './fastify-app.type';

export async function init({
  serverOptions,
  cerealConnectionInfo,
  rateLimitOptions,
  swaggerOptions,
  swaggerUiOptions,
  typeormLoggerOptions,
  gptServiceOptions,
}: ApplicationInitParams) {
  const server: FastifyInstance = Fastify(serverOptions);

  server.register(fastifyRateLimit, rateLimitOptions ?? { max: 100, timeWindow: 1000 });
  server.register(fastifySensible);

  server.register(fastifySwagger, swaggerOptions ?? {});
  server.register(fastifySwaggerUi, swaggerUiOptions ?? {});

  // fastify-multipart 플러그인 등록
  server.register(fastifyMultipart, { addToBody: true });

  server.setErrorHandler(errorHandler);

  const cerealDataSource: DataSource = await mysqlDataSource({
    connectionInfo: cerealConnectionInfo,
    entities: [ChatEntity, ChatMessageEntity, ChatContextEntity],
    useLogging: typeormLoggerOptions?.useQueryLogging,
  }).initialize();

  // const gptService: GptService = new UpstageService({ gptConfig: gptServiceOptions?.upstage });
  const gptService: GptService = new OpenAIService({ gptConfig: gptServiceOptions?.open_ai });
  const chatService: ChatService = ChatServiceFactory.create({ cerealDataSource, gptService });

  server.register(_pingServiceController, { pingService: _pingService });
  server.register(chatServiceController, { prefix: '/chat', chatService });

  return server;
}
