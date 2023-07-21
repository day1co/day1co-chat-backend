import { Repository } from 'typeorm';

import { CerealBaseDao } from './base-dao';
import type { ChatSpaceDaoConstructor } from '../chat-service.type';
import type { BaseChatSpace } from '../entity';

export class ChatSpaceDao extends CerealBaseDao {
  private chatSpaceRepository: Repository<BaseChatSpace>;

  constructor(opts: ChatSpaceDaoConstructor) {
    super(opts.chatSpaceRepository);
    this.chatSpaceRepository = opts.chatSpaceRepository;
  }
}
