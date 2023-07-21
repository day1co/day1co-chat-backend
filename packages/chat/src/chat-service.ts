import { ObjectUtil, UnknownException, Logger, LoggerFactory, NotFoundException } from '@day1co/pebbles';
import {
  BaseChatServiceInterface,
  CloseConversationRequest,
  CreateConversationRequest,
  CreateMessageRequest,
  FindConversationsRequest,
  FindMessagesRequest,
  FindResponse,
  GetMessageByMessageIdRequest,
  GptServiceType,
  UpdateMessageFeedbackRequest,
} from './chat-service.type';
import { ChatDao, ChatContextDao, ChatMessageDao } from './dao';
import { ChatSpaceDao } from './dao/chat-space-dao';
import { ChatState } from './entity';

export type ChatServiceConstructor = {
  chatDao: ChatDao;
  chatMessageDao: ChatMessageDao;
  chatContextDao: ChatContextDao;
  gptService: any;
  chatSpaceDao: ChatSpaceDao;
};

export class ChatService implements BaseChatServiceInterface {
  private chatDao: ChatDao;
  private chatMessageDao: ChatMessageDao;
  private chatContextDao: ChatContextDao;
  private gptService: any;
  private chatSpaceDao: ChatSpaceDao;
  private readonly logger: Logger;

  constructor(opts: ChatServiceConstructor) {
    this.chatDao = opts.chatDao;
    this.chatMessageDao = opts.chatMessageDao;
    this.chatContextDao = opts.chatContextDao;
    this.gptService = opts.gptService;
    this.chatSpaceDao = opts.chatSpaceDao;
    this.logger = LoggerFactory.getLogger(`cereal:package:chat:[${opts.gptService.serviceName}]chat-service`);
  }

  /** chat */
  findConversations(query: FindConversationsRequest): FindResponse {
    return this.chatDao.select({ include: ObjectUtil.omit(query, ['limit']), limit: query?.limit });
  }

  updateConversationByConversationId({ conversationId, data }) {
    return this.chatDao.update({ include: { conversationId } }, data);
  }

  async createConversation({ spaceId, context, customerId, contextId }: CreateConversationRequest) {
    let conversationId = null;

    try {
      const result = await this.gptService.createConversation({ spaceId, context });
      conversationId = result.conversationId;
    } catch (err) {
      const errMessage = `[CHAT] create conversation is fail, service=${this.gptService.serviceName}`;
      this.logger.error(errMessage);
    }

    this.logger.info(`create conversation success spaceId=${spaceId}, chatId=${conversationId}`);

    if (!this.gptService.serviceName) {
      new NotFoundException(`NOT_FOUND_GPT_SERVICE_NAME`);
    }

    if (!ObjectUtil.isEmpty(conversationId)) {
      this.chatDao.insert({
        type: this.gptService.serviceName,
        state: ChatState.ACTIVE,
        spaceId,
        contextId,
        conversationId,
        customerId,
      });

      if (this.gptService.serviceName === GptServiceType.UPSTAGE) {
        this.gptService.createMessage({
          conversationId,
          question: 'Start the conversation',
        });
      }
    }
    return { conversationId };
  }

  async findMessages({ conversationId }: FindMessagesRequest) {
    return await this.chatMessageDao.select({ include: { conversationId }, sort: { createdAt: 'ASC' } });
  }

  async createMessage({ conversationId, question, clipId }: CreateMessageRequest) {
    const chat = await this.findConversations({ conversationId });
    const { identifiers } = await this.chatMessageDao.insert({
      conversationId,
      question,
      messageId: '',
    });

    // openAI 사용할 때
    const messages = await this.findMessages({ conversationId });
    let context = '';
    if (chat.length > 0 && chat[0]?.contextId) {
      const contexts = await this.findConversationContexts({ id: chat[0].contextId });
      context = contexts[0].context;
    }

    let result;
    try {
      result = await this.gptService.createMessage({
        conversationId,
        question,
        clipId,
        context,
        messages,
      });
    } catch (err) {
      const errMessage = `[CHAT] create qna is fail, service=${this.gptService.serviceName}`;
      this.logger.error(errMessage);
    }

    if (!result?.messageId) {
      new UnknownException(500, `FAIL_CHAT_MESSAGE_SEND conversationId=${conversationId}`);
    }

    this.logger.info(`send message success chatId=${conversationId}, messageId=${result.messageId}`);
    this.chatMessageDao.updateById(identifiers[0].id, result);

    return result;
  }

  // 대화 종료
  async closeConversation({ conversationId }: CloseConversationRequest) {
    // 대화방 아이디 값으로 대화 종료 진행
    const response = await this.gptService.closeConversation({ conversationId });
    this.logger.info(`close chat success chatId=${conversationId}`);

    await this.chatDao.update({ include: { conversationId } }, { state: ChatState.CLOSED });
    const chat = await this.chatDao.selectFirst({ include: { conversationId } });
    return {
      id: chat.id,
      conversationId,
      state: chat.state,
      message: response,
    };
  }

  // 대화 피드백
  async updateMessageFeedback({ messageId, feedback }: UpdateMessageFeedbackRequest) {
    const response = await this.gptService.feedbackForMessage({ feedback, messageId });
    this.logger.info(`message feedback success messageId=${messageId}, feedback=${feedback}`);

    this.chatMessageDao.update({ include: { messageId } }, { feedback });
    return response;
  }

  getMessageByMessageId({ messageId }: GetMessageByMessageIdRequest) {
    return this.chatMessageDao.selectFirst({ include: { messageId } });
  }

  /*** space */
  findSpaces({ spaceId, spaceName }) {
    return this.chatSpaceDao.select({ include: { spaceId, spaceName } });
  }
  async createSpace({ spaceName }) {
    const response = await this.gptService.createSpace({ spaceName });
    this.chatSpaceDao.insert(response);
    return response;
  }
  async deleteSpace({ spaceName }) {
    const response = await this.gptService.deleteSpace({ spaceName });
    this.chatSpaceDao.delete(response);
    return response;
  }

  /*** context (맥락) */
  findConversationContexts(query: {
    id?: number | number[];
    state?: string | string[];
    target?: string;
    targetId?: number;
  }) {
    return this.chatContextDao.select({ include: { type: this.gptService, ...query } });
  }
  // 맥락 추가
  async createConversationContext(command) {
    return this.chatContextDao.insert({
      spaceId: '',
      target: command.target || 'COURSE',
      targetId: command.targetId || command.courseId,
      context: command.context,
    });
  }
  // 맥락 수정
  updateConversationContextById(id, command) {
    return this.chatContextDao.updateById(id, command);
  }
  // 맥락 삭제
  deleteConversationContextById(id) {
    return this.chatContextDao.delete(id);
  }
}
