import { Repository } from 'typeorm';

import { CerealBaseDao } from './base-dao';
import type { ChatMessageDaoConstructor } from '../chat-service.type';
import type { BaseChatMessage } from '../entity';

export class ChatMessageDao extends CerealBaseDao {
  private chatRepository: Repository<BaseChatMessage>;

  constructor(opts: ChatMessageDaoConstructor) {
    super(opts.chatMessageRepository);
    this.chatRepository = opts.chatMessageRepository;
  }
}
