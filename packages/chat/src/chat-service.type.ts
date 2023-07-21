import type { BaseChat, BaseChatContext, BaseChatMessage, BaseChatSpace } from './entity';
import type { DataSource, Repository } from 'typeorm';

export enum GptServiceType {
  UPSTAGE = 'UPSTAGE',
  OPEN_AI = 'OPEN_AI',
}

export enum ChatMessageFeedback {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
}

export type CreateConversationRequest = {
  context: string;
  contextId?: number;
  customerId?: number;
  spaceId?: string;
};
export type FindMessagesRequest = { conversationId: string };
export type CreateMessageRequest = {
  conversationId: string;
  question: string;
  clipId?: number;
  customerId?: number;
};
export type CreateQnaRequest = {
  title: string;
  contents: string;
  courseId: number;
  clipId: number;
  customerId?: number;
};
export type CloseConversationRequest = { conversationId: string };
export type UpdateMessageFeedbackRequest = { feedback: ChatMessageFeedback; messageId: string };
export type FindConversationsRequest = {
  customerId?: number;
  state?: string;
  spaceId?: string;
  conversationId?: string;
  limit?: number;
};
export type GetMessageByMessageIdRequest = { messageId: string };

export type FindResponse = Promise<Record<string, any>[]>;
export type CreateConversationResponse = Promise<{ conversationId: string | null }>;
export type CreateMessageResponse = Promise<{ answer: string; messageId: string }>;
export type CreateQnaResponse = Promise<{ answer: string; messageId: string }>;
export type CloseConversationResponse = Promise<{
  id: number;
  conversationId: string;
  state: string;
  message?: string;
}>;
export type UpdateMessageFeedbackResponse = Promise<{ message: string }>;

export interface BaseChatServiceInterface {
  // 해당 대화목록 조회
  findConversations(query: FindConversationsRequest): FindResponse;
  // 대화 시작
  createConversation({ spaceId, context, customerId }: CreateConversationRequest): CreateConversationResponse;
  // 대화 진행
  createMessage({ conversationId, customerId, question }: CreateMessageRequest): CreateMessageResponse;
  // 대화 종료
  closeConversation({ conversationId }: CloseConversationRequest): CloseConversationResponse;
  // 특정 대화의 메세지 조회
  findMessages({ conversationId }: FindMessagesRequest): FindResponse;
  // 대화 피드백
  updateMessageFeedback({ feedback, messageId }: UpdateMessageFeedbackRequest): UpdateMessageFeedbackResponse;
  // 맥락 조회
  findConversationContexts(query);
  // 맥락 추가
  createConversationContext(command);
  // 맥락 수정
  updateConversationContextById(id, command);
  // 맥락 삭제
  deleteConversationContextById(id);
}

export type ChatServiceFactoryCreateOptions = {
  cerealDataSource: DataSource;
  gptService: any;
};

export type GptConfig = {
  host?: string;
  key?: string;
};

// XXX: GptService 정의
export interface GptService {}

export type ChatMessageDaoConstructor = {
  chatMessageRepository: Repository<BaseChatMessage>;
};

export type ChatDaoConstructor = {
  chatRepository: Repository<BaseChat>;
};

export type ChatContextDaoConstructor = {
  chatContextRepository: Repository<BaseChatContext>;
};

export type ChatSpaceDaoConstructor = {
  chatSpaceRepository: Repository<BaseChatSpace>;
};
