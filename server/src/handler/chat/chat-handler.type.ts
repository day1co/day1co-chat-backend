import { ChatMessageFeedback } from '@day1co/cereal-chat';
import { FastifyRequest } from 'fastify';

export type ChatListGetRequest = FastifyRequest<{
  Headers: { site: string };
  Querystring: {
    target: string;
    targetId: number;
    state: string;
    customerId: number;
    limit: number;
  };
}>;

export type ChatOpenPostRequest = FastifyRequest<{
  Headers: { site: string };
  Body: {
    target: string;
    targetId: number;
    customerId: number;
  };
}>;

export type ChatCloseDeleteRequest = FastifyRequest<{
  Headers: { site: string };
  Params: { conversationId: string };
}>;

export type ChatContextListGetRequest = FastifyRequest<{
  Headers: { site: string };
  Querystring: {
    state: string;
    target: string;
    targetId: number;
  };
}>;

export type ChatContextPostRequest = FastifyRequest<{
  Headers: { site: string };
  Body: {
    context: string;
    target: string;
    targetId: number;
  };
}>;

export type ChatMessagePostRequest = FastifyRequest<{
  Headers: { site: string };
  Params: { conversationId: string };
  Body: {
    question: string;
    clipId?: number;
  };
}>;

export type ChatMessageListGetRequest = FastifyRequest<{
  Headers: { site: string };
  Params: { conversationId: string };
}>;

export type ChatMessageFeedbackPutRequest = FastifyRequest<{
  Headers: { site: string };
  Params: {
    conversationId: string;
    messageId: string;
  };
  Body: { feedback: ChatMessageFeedback };
}>;
