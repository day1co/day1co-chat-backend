import { ChatService } from './chat-service';
import { ChatServiceFactoryCreateOptions } from './chat-service.type';
import { ChatContextDao, ChatDao, ChatMessageDao, ChatSpaceDao } from './dao';
import { ChatContextEntity, ChatEntity, ChatMessageEntity, ChatSpaceEntity } from './entity';

export class ChatServiceFactory {
  static create({ cerealDataSource, gptService }: ChatServiceFactoryCreateOptions) {
    const chatRepository = cerealDataSource.getRepository(ChatEntity);
    const chatDao = new ChatDao({ chatRepository });

    const chatContextRepository = cerealDataSource.getRepository(ChatContextEntity);
    const chatContextDao = new ChatContextDao({ chatContextRepository });

    const chatMessageRepository = cerealDataSource.getRepository(ChatMessageEntity);
    const chatMessageDao = new ChatMessageDao({ chatMessageRepository });

    const chatSpaceRepository = cerealDataSource.getRepository(ChatSpaceEntity);
    const chatSpaceDao = new ChatSpaceDao({ chatSpaceRepository });

    return new ChatService({ chatDao, chatContextDao, chatMessageDao, gptService, chatSpaceDao });
  }
}
