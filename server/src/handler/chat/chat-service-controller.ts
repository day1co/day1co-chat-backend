import { ChatService } from '@day1co/cereal-chat';
import { FastifyInstance, RegisterOptions } from 'fastify';
import {
  chatMessageFeedbackPutHandler,
  chatListGetHandler,
  chatMessageListGetHandler,
  chatOpenPostHandler,
  chatMessagePostHandler,
  chatCloseDeleteHandler,
  chatContextListGetHandler,
  chatContextPostHandler,
} from './chat-handler';
import {
  chatMessageFeedbackPutSchema,
  chatListGetSchema,
  chatMessageListGetSchema,
  chatOpenPostSchema,
  chatMessagePostSchema,
  chatCloseDeleteSchema,
  chatContextListSchema,
  chatContextPostSchema,
} from './chat-handler.schema';

type FastifyRegisterOptions<Options> = RegisterOptions & Options;

export async function chatServiceController(
  fastify: FastifyInstance,
  opts: FastifyRegisterOptions<{ chatService: ChatService }>
) {
  const chatService = opts.chatService;
  fastify.get('/chats', { schema: chatListGetSchema }, chatListGetHandler(chatService));
  fastify.post('/chats', { schema: chatOpenPostSchema }, chatOpenPostHandler(chatService));
  fastify.get('/chats/contexts', { schema: chatContextListSchema }, chatContextListGetHandler(chatService));
  fastify.post('/chats/contexts', { schema: chatContextPostSchema }, chatContextPostHandler(chatService));
  fastify.delete('/chats/:conversationId', { schema: chatCloseDeleteSchema }, chatCloseDeleteHandler(chatService));
  fastify.post(
    '/chats/:conversationId/messages',
    { schema: chatMessagePostSchema },
    chatMessagePostHandler(chatService)
  );
  fastify.get(
    '/chats/:conversationId/messages',
    { schema: chatMessageListGetSchema },
    chatMessageListGetHandler(chatService)
  );
  fastify.put(
    '/chats/:conversationId/messages/:messageId/feedback',
    { schema: chatMessageFeedbackPutSchema },
    chatMessageFeedbackPutHandler(chatService)
  );
}
