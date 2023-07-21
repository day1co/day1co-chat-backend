import { Repository } from 'typeorm';

import { CerealBaseDao } from './base-dao';
import type { ChatDaoConstructor } from '../chat-service.type';
import type { BaseChat } from '../entity';

export class ChatDao extends CerealBaseDao {
  private chatRepository: Repository<BaseChat>;

  constructor(opts: ChatDaoConstructor) {
    super(opts.chatRepository);
    this.chatRepository = opts.chatRepository;
  }
}
