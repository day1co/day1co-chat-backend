import { HttpClient, Logger, LoggerFactory } from '@day1co/pebbles';
import { ChatMessageFeedback, GptConfig, GptServiceType } from '../chat-service.type';
import {
  BaseGptServiceInterface,
  CreateSpace,
  DeleteSpace,
  FindConversationMessages,
  FindConversations,
  FindSpaces,
} from './gpt-service.interface';

export class UpstageService implements BaseGptServiceInterface {
  private readonly gptConfig: GptConfig;
  private httpClient: any;
  private headers: any;
  private readonly logger: Logger;
  public readonly serviceName = GptServiceType.UPSTAGE;

  constructor(opts) {
    this.gptConfig = opts.gptConfig;
    this.httpClient = new HttpClient(this.gptConfig.host);
    this.headers = { Authorization: this.gptConfig.key };
    this.logger = LoggerFactory.getLogger('cereal:package:chat:upstage-service');
  }

  async findSpaces(): Promise<FindSpaces> {
    const response = await this.httpClient.sendGetRequest('/spaces', { headers: this.headers });

    const result = response?.data.spaces.map((space) => ({ spaceName: space.spacename, spaceId: space.space_id }));
    return result;
  }

  async createSpace({ spaceName, isPublic }: { spaceName: string; isPublic: boolean }): Promise<CreateSpace> {
    const response = await this.httpClient.sendPostRequest(
      '/spaces',
      {
        spacename: spaceName,
        public: isPublic,
      },
      { headers: this.headers }
    );

    return {
      spaceId: response.data?.space_id,
      message: response.data.message,
    };
  }

  async deleteSpace({ spaceName }: { spaceName: string }): Promise<DeleteSpace> {
    const response = await this.httpClient.sendDeleteRequest(`/spaces/${spaceName}`, { headers: this.headers });

    return {
      spaceId: response.data?.space_id,
      message: response.data.message,
    };
  }

  async createConversation({ spaceId, context }: { spaceId: string; context: string[] }) {
    let response;
    try {
      response = await this.httpClient.sendPostRequest(
        '/conversations',
        {
          space_id: spaceId,
          doc_ids: context,
        },
        { headers: this.headers }
      );

      return { conversationId: response?.data.conv_id || null };
    } catch (err) {
      this.logger.error('failed to create conversation from upstage, message=%o', err);
      throw err;
    }
  }

  async findConversations({ spaceId }: { spaceId: string }): Promise<FindConversations> {
    const response = await this.httpClient.sendGetRequest(`/conversations?space_id=${spaceId}`, {
      headers: this.headers,
    });

    return { conversationId: response?.data.conv_id };
  }
  async findConversationMessages({
    conversationId,
  }: {
    conversationId: string;
  }): Promise<FindConversationMessages | never> {
    let result;

    try {
      const response = await this.httpClient.sendGetRequest(`/conversations/${conversationId}`, {
        headers: this.headers,
      });

      result = response.data.map((message) => ({
        question: message.query,
        answer: message.response,
        messageId: message.msg_id,
      }));

      return result;
    } catch (err) {
      this.logger.error('failed to find conversation message from upstage, message=%o', err);
      throw err;
    }
  }

  async closeConversation({ conversationId }: { conversationId: string }) {
    let response;
    try {
      response = await this.httpClient.sendPatchRequest(`/conversations/${conversationId}`, {
        headers: this.headers,
      });

      return { message: response?.data.message };
    } catch (err) {
      this.logger.error('failed to close conversation from upstage, message=%o', err);
      throw err;
    }
  }

  async createMessage({ conversationId, question }: { conversationId: string; question: string }) {
    let answer, messageId;

    try {
      const response = await this.httpClient.sendPostRequest(
        '/messages',
        {
          conv_id: conversationId,
          query: question,
        },
        { headers: this.headers }
      );

      const dataArr = response.data.split('[EOS]: ');
      answer = dataArr[0];
      messageId = dataArr[1];

      return { answer, messageId };
    } catch (err) {
      this.logger.error('failed to create message from upstage, message=%o', err);
      throw err;
    }
  }

  async feedbackForMessage({ feedback, messageId }: { feedback: string; messageId: string }) {
    let response;
    try {
      let upstageFeedback = '';
      if (feedback === ChatMessageFeedback.LIKE) upstageFeedback = 'like';
      else if (feedback === ChatMessageFeedback.DISLIKE) upstageFeedback = 'dislike';

      response = await this.httpClient.sendPostRequest(
        `/messages/${messageId}/feedbacks`,
        { feedback: upstageFeedback },
        { headers: this.headers }
      );

      return response?.data;
    } catch (err) {
      this.logger.error('failed to feedback message from upstage, message=%o', err);
      throw err;
    }
  }
}
