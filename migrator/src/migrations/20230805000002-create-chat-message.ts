/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

const chatMessageTable = 'chat_message';

export class ChatMessage20230805000002 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    const chatMessageBuilder: Table = new Table({
      name: chatMessageTable,
      columns: [
        { name: 'id', type: 'int', unsigned: true, isNullable: false, isGenerated: true, generationStrategy: 'increment', isPrimary: true },
        { name: 'conversation_id', type: 'varchar', isNullable: false, comment: '대화방 ID'},
        { name: 'message_id', type: 'varchar', isNullable: false, comment: '대화메세지 ID'},
        { name: 'parent_message_id', type: 'varchar', isNullable: true, comment: '이전 대화메세지 ID'},
        { name: 'question', type: 'text', isNullable: true, comment: '질문'},
        { name: 'answer', type: 'text', isNullable: true, comment: '답변'},
        { name: 'feedback', type: 'varchar', isNullable: true, comment: '답변에 대한 피드백' },
        { name: 'created_at', type: 'datetime', isNullable: false, default: 'CURRENT_TIMESTAMP', comment: '생성일' }, 
        { name: 'updated_at', type: 'datetime', isNullable: false, default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', comment: '수정일' },
      ],
    });

    const chatMessageIndex1: TableIndex = new TableIndex({ name: `${chatMessageTable}_conversation_id_index`, columnNames: ['conversation_id'] });
    const chatMessageIndex2: TableIndex = new TableIndex({ name: `${chatMessageTable}_message_id_index`, columnNames: ['message_id'] });

    await queryRunner.createTable(chatMessageBuilder, true);
    await queryRunner.createIndex(chatMessageTable, chatMessageIndex1);
    await queryRunner.createIndex(chatMessageTable, chatMessageIndex2);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(chatMessageTable, `${chatMessageTable}_message_id_index`);
    await queryRunner.dropIndex(chatMessageTable, `${chatMessageTable}_conversation_id_index`);
    await queryRunner.dropTable(chatMessageTable);
  }
}
