import { Logger, LoggerFactory, ObjectUtil } from '@day1co/pebbles';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessageFeedback, GptConfig, GptServiceType } from '../chat-service.type';
import { BaseGptServiceInterface } from './gpt-service.interface';

export class OpenAIService implements BaseGptServiceInterface {
  private readonly gptConfig: GptConfig;
  private configuration: Configuration;
  private openai: OpenAIApi;
  private readonly logger: Logger;
  private readonly model: string;
  public readonly serviceName = GptServiceType.OPEN_AI;

  constructor(opts) {
    this.gptConfig = opts.gptConfig;
    this.logger = LoggerFactory.getLogger('cereal:package:chat:open-ai-service');
    this.configuration = new Configuration({ apiKey: this.gptConfig.key });
    this.openai = new OpenAIApi(this.configuration);
    this.model = 'gpt-3.5-turbo';
  }

  async createConversation(command): Promise<{ conversationId: string }> {
    return { conversationId: uuidv4() };
  }

  async closeConversation({ conversationId }: { conversationId: string }): Promise<{ message?: string }> {
    return { message: `${conversationId} chat is closed` };
  }

  async createMessage({
    question,
    context,
    messages,
  }: {
    conversationId: string;
    question: string;
    context: string;
    messages;
  }): Promise<{ answer: string; messageId: string } | never> {
    let messageId = '';
    let answer = '';

    const completionMessages: ChatCompletionRequestMessage[] = [
      {
        role: 'system',
        content: `당신은 나의 학습에 도움이 되는 어시스턴스입니다. 다음 제공되는 정보에 기반해서 대답해주세요. --- ${context}`,
      },
    ];
    messages?.map((prevMessage) => {
      if (!ObjectUtil.isNullish(prevMessage.question) && !ObjectUtil.isNullish(prevMessage.answer)) {
        completionMessages.push({ role: 'user', content: prevMessage.question });
        completionMessages.push({ role: 'assistant', content: prevMessage.answer });
      }
    });
    completionMessages.push({ role: 'user', content: question });

    try {
      // max_token 값은 최대 4096
      const response = await this.openai.createChatCompletion({
        model: this.model,
        messages: completionMessages,
        temperature: 0.5,
      });

      messageId = response.data.id;
      answer = response?.data?.choices[0]?.message?.content || '';

      return { answer, messageId };
    } catch (err) {
      this.logger.error('failed to create message from openAI, message=%o', err);
      throw err;
    }
  }
  async feedbackForMessage({
    messageId,
    feedback,
  }: {
    messageId: string;
    feedback: ChatMessageFeedback;
  }): Promise<{ messageId: string; feedback: ChatMessageFeedback }> {
    return { messageId, feedback };
  }
}
