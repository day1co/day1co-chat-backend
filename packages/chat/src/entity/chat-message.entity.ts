import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import type { BaseChatMessage } from './chat-message.interface';

@Entity('chat_message')
export class ChatMessageEntity implements BaseChatMessage {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'conversation_id', length: 255, comment: '대화 id' })
  conversationId: string;

  @Column('varchar', { name: 'message_id', length: 255, comment: '메세지 id' })
  messageId: string;

  @Column('varchar', { name: 'parent_message_id', length: 255 })
  parentMessageId: string;

  @Column('text', { name: 'question' })
  question: string;

  @Column('text', { name: 'answer' })
  answer: string;

  @Column('varchar', { name: 'feedback', length: 255 })
  feedback: string;

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
