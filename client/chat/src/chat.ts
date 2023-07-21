import { HttpClient, HttpReqConfig } from '@day1co/pebbles';

import { paramsSerializer } from './chat-util';
import {
  CloseChatCommand,
  CreateChatCommand,
  CreateChatContextCommand,
  CreateChatMessageCommand,
  FindChatContextsQuery,
  FindChatMessagesQuery,
  FindChatQuery,
  UpdateChatMessageFeedbackCommand,
} from './chat.type';
import type { Site } from './chat.constant';

class ChatClient {
  private readonly prefixUrl: string = '/chat/chats';
  private readonly httpClient: HttpClient;
  private readonly httpClientConfig: HttpReqConfig;
  private readonly headers: { site: Site };

  constructor({ host, site }: { host: string; site: string }) {
    this.httpClient = new HttpClient(host);
    this.httpClientConfig = { paramsSerializer };
    this.headers = { site };
  }

  findChat = async (query: FindChatQuery) => {
    const apiUrl = `${this.prefixUrl}`;
    const { target, targetId } = query;

    const res = await this.httpClient.sendGetRequest(apiUrl, {
      headers: this.headers,
      params: {
        target,
        targetId,
        customerId: query?.customerId,
        state: query?.state,
        limit: query?.limit,
      },
      paramsSerializer: this.httpClientConfig.paramsSerializer,
    });
    return res.data;
  };

  createChat = async (command: CreateChatCommand) => {
    const apiUrl = `${this.prefixUrl}`;
    const { target, targetId } = command;
    const data = {
      target,
      targetId,
      customerId: command?.customerId,
    };

    const res = await this.httpClient.sendPostRequest(apiUrl, data, { headers: this.headers });
    return res.data;
  };

  closeChat = async (command: CloseChatCommand) => {
    const { conversationId } = command;
    const apiUrl = `${this.prefixUrl}/${conversationId}`;

    const res = await this.httpClient.sendDeleteRequest(apiUrl, { headers: this.headers });
    return res.data;
  };

  findChatContexts = async (query: FindChatContextsQuery) => {
    const { target, targetId } = query;
    const apiUrl = `${this.prefixUrl}/contexts`;

    const res = await this.httpClient.sendGetRequest(apiUrl, {
      headers: this.headers,
      params: {
        state: query?.state,
        target,
        targetId,
      },
      paramsSerializer: this.httpClientConfig.paramsSerializer,
    });
    return res.data;
  };

  createChatContext = async (command: CreateChatContextCommand) => {
    const apiUrl = `${this.prefixUrl}/contexts`;

    const res = await this.httpClient.sendPostRequest(apiUrl, command, { headers: this.headers });
    return res.data;
  };

  findChatMessages = async (query: FindChatMessagesQuery) => {
    const { conversationId } = query;
    const apiUrl = `${this.prefixUrl}/${conversationId}/messages`;

    const res = await this.httpClient.sendGetRequest(apiUrl, { headers: this.headers });
    return res.data;
  };

  createChatMessage = async (command: CreateChatMessageCommand) => {
    const { conversationId, question, clipId } = command;
    const apiUrl = `${this.prefixUrl}/${conversationId}/messages`;

    const res = await this.httpClient.sendPostRequest(apiUrl, { question, clipId }, { headers: this.headers });
    return res.data;
  };

  updateChatMessageFeedback = async (command: UpdateChatMessageFeedbackCommand) => {
    const { messageId, feedback, conversationId } = command;
    const apiUrl = `${this.prefixUrl}/${conversationId}/messages/${messageId}/feedback`;

    const res = await this.httpClient.sendPutRequest(apiUrl, { feedback }, { headers: this.headers });
    return res.data;
  };
}

export { ChatClient };
