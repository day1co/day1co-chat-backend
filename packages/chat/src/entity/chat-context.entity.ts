import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import type { BaseChatContext } from './chat-context.interface';

@Entity('chat_context')
export class ChatContextEntity implements BaseChatContext {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'state', length: 255, comment: 'context의 상태 (NORMAL, DELETED)' })
  state: string;

  @Column('varchar', { name: 'type', length: 255, comment: '타입 (제공업체)' })
  type: string;

  @Column('int', { name: 'space_id' })
  spaceId: string;

  @Column('varchar', { name: 'target', length: 255, comment: '맥락 사용 타겟 (ex. 코스, 상품, 클립..)' })
  target: string;

  @Column('int', { name: 'target_id' })
  targetId: number;

  @Column('varchar', { name: 'context', length: 255, comment: '맥락' })
  context: string;

  @Column('datetime', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('datetime', {
    name: 'updated_at',
    onUpdate: 'CURRENT_TIMESTAMP',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
