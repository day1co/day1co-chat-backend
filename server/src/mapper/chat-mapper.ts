import {
  ChatCloseDeleteRequest,
  ChatMessageFeedbackPutRequest,
  ChatListGetRequest,
  ChatMessageListGetRequest,
  ChatOpenPostRequest,
  ChatMessagePostRequest,
  ChatContextListGetRequest,
  ChatContextPostRequest,
} from '../handler/chat/chat-handler.type';

export const parseChatListGetQuery = (req: ChatListGetRequest) => {
  return {
    target: req.query.target,
    targetId: req.query.targetId,
    state: req.query?.state || 'ACTIVE',
    customerId: req.query?.customerId,
    limit: req.query?.limit || 10,
  };
};

export const parseChatOpenPostCommand = (req: ChatOpenPostRequest) => {
  return {
    target: req.body.target,
    targetId: req.body.targetId,
    customerId: req.body?.customerId,
  };
};

export const parseChatClosePostCommand = (req: ChatCloseDeleteRequest) => {
  return {
    conversationId: req.params.conversationId,
  };
};

export const parseChatContextListGetCommand = (req: ChatContextListGetRequest) => {
  return {
    state: req.query.state,
    target: req.query.target,
    targetId: req.query.targetId,
  };
};

export const parseChatContextPostCommand = async (req: ChatContextPostRequest) => {
  return {
    context: req.body.context,
    target: req.body.target,
    targetId: req.body.targetId,
  };
};

export const parseChatMessagePostCommand = (req: ChatMessagePostRequest) => {
  return {
    conversationId: req.params.conversationId,
    question: req.body?.question,
    clipId: req.body?.clipId,
  };
};

export const parseChatMessageListGetQuery = (req: ChatMessageListGetRequest) => {
  return {
    conversationId: req.params.conversationId,
  };
};

export const parseChatMessageFeedbackPutCommand = (req: ChatMessageFeedbackPutRequest) => {
  return {
    conversationId: req.params.conversationId,
    messageId: req.params.messageId,
    feedback: req.body.feedback,
  };
};
