import { ChatContextTarget, ChatMessageFeedback } from '@day1co/cereal-chat';
import { FastifySchema } from 'fastify';

export const chatListGetSchema: FastifySchema = {
  tags: ['CHAT'],
  summary: 'Chat 대화 목록',
  description: '대화 목록을 요청합니다',
  headers: {
    type: 'object',
    properties: { site: { type: 'string' } },
    required: ['site'],
  },
  querystring: {
    type: 'object',
    properties: {
      target: { type: 'string' },
      targetId: { type: 'number' },
      customerId: { type: 'number' },
      state: { type: 'string' },
      limit: { type: 'number' },
    },
    required: ['target', 'targetId'],
  },
};

export const chatOpenPostSchema: FastifySchema = {
  tags: ['CHAT'],
  summary: 'Chat 대화 시작',
  description: '대화 시작을 요청합니다.',
  headers: {
    type: 'object',
    properties: { site: { type: 'string' } },
    required: ['site'],
  },
  body: {
    type: 'object',
    properties: {
      target: {
        type: 'string',
        enum: Object.keys(ChatContextTarget),
      },
      targetId: { type: 'number' },
      customerId: { type: 'number' },
    },
    required: ['target', 'targetId'],
  },
};

export const chatCloseDeleteSchema: FastifySchema = {
  tags: ['CHAT'],
  summary: 'Chat 대화 종료',
  description: '대화 종료를 요청합니다.',
  headers: {
    type: 'object',
    properties: { site: { type: 'string' } },
    required: ['site'],
  },
  params: {
    type: 'object',
    properties: { conversationId: { type: 'string' } },
    required: ['conversationId'],
  },
};

export const chatContextListSchema: FastifySchema = {
  tags: ['CHAT'],
  summary: 'Chat 대화 컨텍스트 조회',
  description: '대화 컨텍스트 조회를 요청합니다.',
  headers: {
    type: 'object',
    properties: { site: { type: 'string' } },
    required: ['site'],
  },
  querystring: {
    type: 'object',
    properties: {
      state: { type: 'string' },
      target: { type: 'string' },
      targetId: { type: 'number' },
    },
    required: ['target', 'targetId'],
  },
};

export const chatContextPostSchema: FastifySchema = {
  tags: ['CHAT'],
  summary: 'Chat 학습 자료 업로드',
  description: '대화 시 사용되는 학습자료를 업로드합니다.',
  // consumes: ['multipart/form-data'],
  headers: {
    type: 'object',
    properties: { site: { type: 'string' } },
    required: ['site'],
  },
  body: {
    type: 'object',
    properties: {
      context: { type: 'string' },
      target: { type: 'string' },
      targetId: { type: 'number' },
    },
    required: ['context', 'target', 'targetId'],
  },
};

export const chatMessagePostSchema: FastifySchema = {
  tags: ['CHAT'],
  summary: 'Chat 질문 하기',
  description: '질문을 요청하고 답변을 받아옵니다.',
  headers: {
    type: 'object',
    properties: { site: { type: 'string' } },
    required: ['site'],
  },
  params: {
    type: 'object',
    properties: { conversationId: { type: 'string' } },
    required: ['conversationId'],
  },
  body: {
    type: 'object',
    properties: {
      question: { type: 'string' },
      clipId: { type: 'string' },
    },
  },
};

export const chatMessageListGetSchema: FastifySchema = {
  tags: ['CHAT'],
  summary: 'Chat 특정 대화 목록',
  description: '특정 대화 내용을 요청합니다',
  headers: {
    type: 'object',
    properties: { site: { type: 'string' } },
    required: ['site'],
  },
  params: {
    type: 'object',
    properties: {
      conversationId: { type: 'string' },
    },
    required: ['conversationId'],
  },
};

export const chatMessageFeedbackPutSchema: FastifySchema = {
  tags: ['CHAT'],
  summary: 'Chat 답변 피드백',
  description: '답변에 대한 피드백을 전달합니다',
  headers: {
    type: 'object',
    properties: { site: { type: 'string' } },
    required: ['site'],
  },
  params: {
    type: 'object',
    properties: {
      conversationId: { type: 'string' },
      messageId: { type: 'string' },
    },
    required: ['messageId'],
  },
  body: {
    type: 'object',
    properties: {
      feedback: {
        type: 'string',
        enum: Object.keys(ChatMessageFeedback),
      },
    },
    required: ['feedback'],
  },
};
