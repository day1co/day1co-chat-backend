import { ChatMessageFeedback } from '../chat-service.type';

export type CreateSpace = {
  spaceId?: string;
  message: string;
};
export type FindSpaces = {
  spaces: {
    spaceName: string;
    spaceId: string;
  }[];
};
export type DeleteSpace = {
  spaceId?: string;
  message: string;
};
export type CreateConversation = {
  conversationId: string | null;
};
export type FindConversations = {
  conversationId: string[] | null;
};
export type Message = {
  parentMsgId: string | null;
  response: string;
  query: string;
  msgId: string;
  timestamp: string;
};
export type FindConversationMessages = Message[] | undefined;
export type CloseConversation = { message?: string };
export type CreateMessage = { answer: string; messageId: string };
export type FeedbackForMessage = { messageId: string; feedback: ChatMessageFeedback };

export interface BaseGptServiceInterface {
  // 대화 생성
  createConversation({ spaceId, context }: { spaceId?: string; context?: string[] }): Promise<CreateConversation>;
  // 대화방 종료
  closeConversation({ conversationId }: { conversationId: string }): Promise<CloseConversation>;
  // 메시지 전송
  createMessage({ conversationId, question }: { conversationId: string; question: string }): Promise<CreateMessage>;
  // 메시지 피드백
  feedbackForMessage({
    messageId,
    feedback,
  }: {
    messageId: string;
    feedback: ChatMessageFeedback;
  }): Promise<FeedbackForMessage>;
}
