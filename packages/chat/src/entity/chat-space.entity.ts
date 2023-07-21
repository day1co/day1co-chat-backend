import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import type { BaseChatSpace, ChatSpaceState } from './chat-space.interface';

@Entity('chat_space')
export class ChatSpaceEntity implements BaseChatSpace {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'state' })
  state: ChatSpaceState;

  @Column('varchar', { name: 'space_id' })
  spaceId: string;

  @Column('varchar', { name: 'space_name' })
  spaceName: string;

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
