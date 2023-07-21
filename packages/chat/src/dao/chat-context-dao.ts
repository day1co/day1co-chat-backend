import { Repository } from 'typeorm';

import { CerealBaseDao } from './base-dao';
import type { ChatContextDaoConstructor } from '../chat-service.type';
import type { BaseChatContext } from '../entity';

export class ChatContextDao extends CerealBaseDao {
  private chatRepository: Repository<BaseChatContext>;

  constructor(opts: ChatContextDaoConstructor) {
    super(opts.chatContextRepository);
    this.chatRepository = opts.chatContextRepository;
  }
}
