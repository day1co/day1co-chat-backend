import { ChatService } from '@day1co/cereal-chat';
import { BadRequestException, NotFoundException, ObjectUtil } from '@day1co/pebbles';
import { FastifyReply } from 'fastify';
import {
  toView,
  toViews,
  parseChatOpenPostCommand,
  parseChatClosePostCommand,
  parseChatMessagePostCommand,
  parseChatListGetQuery,
  parseChatMessageFeedbackPutCommand,
  parseChatMessageListGetQuery,
  parseChatContextListGetCommand,
  parseChatContextPostCommand,
} from '../../mapper';
import {
  ChatMessageFeedbackPutRequest,
  ChatListGetRequest,
  ChatMessageListGetRequest,
  ChatOpenPostRequest,
  ChatMessagePostRequest,
  ChatCloseDeleteRequest,
  ChatContextListGetRequest,
  ChatContextPostRequest,
} from './chat-handler.type';

export const chatListGetHandler = (chatService: ChatService) => {
  return async function (request: ChatListGetRequest, reply: FastifyReply) {
    const { target, targetId, state, customerId, limit } = parseChatListGetQuery(request);
    const chatContexts = await chatService.findConversationContexts({ target, targetId });

    if (ObjectUtil.isEmpty(chatContexts)) {
      throw new NotFoundException(`NOT_FOUND_CHAT_CONTEXT target=${target}, targetId=${targetId}`);
    }
    const spaceId = chatContexts[0].spaceId;
    const chats = await chatService.findConversations({ customerId, state, spaceId, limit });

    reply.send({ data: toViews(chats), meta: request.headers });
  };
};

export const chatOpenPostHandler = (chatService: ChatService) => {
  return async function (request: ChatOpenPostRequest, reply: FastifyReply) {
    const { target, targetId, customerId } = parseChatOpenPostCommand(request);
    const chatContexts = await chatService.findConversationContexts({ target, targetId });

    const spaceId = chatContexts.length > 0 ? chatContexts[0]?.spaceId : 0;
    const contextId = chatContexts.length > 0 ? chatContexts[0]?.contextId : 0;
    const context = chatContexts.map((chatContext) => chatContext.context).join();

    const result = await chatService.createConversation({ spaceId, context, contextId, customerId });

    reply.send({ data: toView(result), meta: request.headers });
  };
};

export const chatCloseDeleteHandler = (chatService: ChatService) => {
  return async function (request: ChatCloseDeleteRequest, reply: FastifyReply) {
    const { conversationId } = parseChatClosePostCommand(request);

    const result = await chatService.closeConversation({ conversationId });
    reply.send({ data: toView(result), meta: {} });
  };
};

export const chatContextListGetHandler = (chatService: ChatService) => {
  return async function (request: ChatContextListGetRequest, reply: FastifyReply) {
    const query = parseChatContextListGetCommand(request);

    const result = await chatService.findConversationContexts(query);
    reply.send({ data: toViews(result), meta: {} });
  };
};

export const chatContextPostHandler = (chatService: ChatService) => {
  return async function (request: ChatContextPostRequest, reply: FastifyReply) {
    const data = await parseChatContextPostCommand(request);

    const result = await chatService.createConversationContext(data);
    reply.send({ data: toViews(result), meta: {} });
  };
};

export const chatMessagePostHandler = (chatService: ChatService) => {
  return async function (request: ChatMessagePostRequest, reply: FastifyReply) {
    const { conversationId, question, clipId } = parseChatMessagePostCommand(request);

    const [chat] = await chatService.findConversations({ conversationId });
    if (!chat) {
      throw new NotFoundException(`NOT_FOUND_CONVERSATION conversationId=${conversationId}`);
    } else if (chat && ObjectUtil.isNullish(chat.title)) {
      await chatService.updateConversationByConversationId({ conversationId, data: { title: question } });
    }
    const result = await chatService.createMessage({ conversationId, question, clipId });
    reply.send({ data: result, meta: {} });
  };
};

export const chatMessageListGetHandler = (chatService: ChatService) => {
  return async function (request: ChatMessageListGetRequest, reply: FastifyReply) {
    const { conversationId } = parseChatMessageListGetQuery(request);

    const result = await chatService.findMessages({ conversationId });
    reply.send({ data: toViews(result), meta: {} });
  };
};

export const chatMessageFeedbackPutHandler = (chatService: ChatService) => {
  return async function (request: ChatMessageFeedbackPutRequest, reply: FastifyReply) {
    const { messageId, feedback } = parseChatMessageFeedbackPutCommand(request);

    const message = await chatService.getMessageByMessageId({ messageId });
    if (message && !ObjectUtil.isEmpty(message.feedback)) {
      throw new BadRequestException(`ALREADY_SUBMIT_FEEDBACK messageId=${messageId}`);
    }

    const result = await chatService.updateMessageFeedback({ messageId, feedback });
    reply.send({ data: toView(result), meta: {} });
  };
};
