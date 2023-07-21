/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

const chatTable = 'chat';

export class Chat20230805000001 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    const chatBuilder: Table = new Table({
      name: chatTable,
      columns: [
        { name: 'id', type: 'int', unsigned: true, isNullable: false, isGenerated: true, generationStrategy: 'increment', isPrimary: true },
        { name: 'state', type: 'varchar', isNullable: false, default: `'ACTIVE'`, comment: '활성화 상태' },
        { name: 'type', type: 'varchar', isNullable: false, default: `'OPEN_AI'`, comment: '타입 (제공업체)' },
        { name: 'space_id', type: 'varchar', isNullable: true, comment: '대화방이 속한 스페이스 ID'},
        { name: 'customer_id', type: 'int', comment: '대화를 시작한 고객 ID'},
        { name: 'context_id', type: 'int', unsigned: true, comment: '대화에 사용할 정보 ID'},
        { name: 'conversation_id', type: 'varchar', isNullable: false, comment: '대화방 ID'},
        { name: 'title', type: 'varchar', comment: '대화방 제목'},
        { name: 'created_at', type: 'datetime', isNullable: false, default: 'CURRENT_TIMESTAMP', comment: '생성일' }, 
        { name: 'updated_at', type: 'datetime', isNullable: false, default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', comment: '수정일' },
      ],
    });

    const chatIndex1: TableIndex = new TableIndex({ name: `${chatTable}_conversation_id_index`, columnNames: ['conversation_id'] });
    const chatIndex2: TableIndex = new TableIndex({ name: `${chatTable}_customer_id_index`, columnNames: ['customer_id'] });

    await queryRunner.createTable(chatBuilder, true);
    await queryRunner.createIndex(chatTable, chatIndex1);
    await queryRunner.createIndex(chatTable, chatIndex2);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(chatTable, `${chatTable}_customer_id_index`);
    await queryRunner.dropIndex(chatTable, `${chatTable}_conversation_id_index`);
    await queryRunner.dropTable(chatTable);
  }
}
