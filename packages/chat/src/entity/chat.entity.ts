import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import type { BaseChat, ChatState, ChatType } from './chat.interface';

@Entity('chat')
export class ChatEntity implements BaseChat {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'type' })
  type: ChatType;

  @Column('varchar', { name: 'state' })
  state: ChatState;

  @Column('varchar', { name: 'space_id' })
  spaceId: string;

  @Column('varchar', { name: 'conversation_id' })
  conversationId: string;

  @Column('int', { name: 'context_id' })
  contextId: number;

  @Column('int', { name: 'customer_id' })
  customerId: number;

  @Column('varchar', { name: 'title' })
  title: string;

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
