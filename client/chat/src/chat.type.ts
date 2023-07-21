export type FindChatQuery = {
  target: string;
  targetId: number;
  state?: string;
  customerId?: number;
  limit?: number;
};

export type FindChatMessagesQuery = {
  conversationId: string;
};

export type CreateChatMessageCommand = {
  conversationId: string;
  question: string;
  clipId?: number;
};

export type UpdateChatMessageFeedbackCommand = {
  conversationId: string;
  messageId: string;
  feedback: string;
};

export type CreateChatCommand = {
  target: string;
  targetId: number;
  customerId?: number;
};

export type CloseChatCommand = {
  conversationId: string;
};

export type FindChatContextsQuery = {
  state: string;
  target: string;
  targetId: number;
};

export type CreateChatContextCommand = {
  context: string;
  target: string;
  targetId: number;
};

export type CreateManyChatHistoryCommand = {
  type: string;
  target: string;
  targetId: number;
  customerId: number;
  chatId: number[];
};
