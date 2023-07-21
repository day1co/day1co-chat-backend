/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

const chatContextTable = 'chat_context';

export class ChatContext20230805000003 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    const chatContextBuilder: Table = new Table({
      name: chatContextTable,
      columns: [
        { name: 'id', type: 'int', unsigned: true, isNullable: false, isGenerated: true, generationStrategy: 'increment', isPrimary: true },
        { name: 'state', type: 'varchar', isNullable: false, default: `'NORMAL'`, comment: '활성화 상태' },
        { name: 'type', type: 'varchar', isNullable: false, default: `''`, comment: '타입 (제공업체)' },
        { name: 'space_id', type: 'varchar', isNullable: true, comment: '대화방이 속한 스페이스 ID'},
        { name: 'target', type: 'varchar', isNullable: false, comment: '타겟 (ex. COURSE, PRODUCT..)'},
        { name: 'target_id', type: 'int', unsigned: true, isNullable: false, comment: '타겟 ID'},
        { name: 'context', type: 'longtext', isNullable: true, comment: '맥락 데이터'},
        { name: 'created_at', type: 'datetime', isNullable: false, default: 'CURRENT_TIMESTAMP', comment: '생성일' }, 
        { name: 'updated_at', type: 'datetime', isNullable: false, default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', comment: '수정일' },
      ],
    });

    const chatContextIndex1: TableIndex = new TableIndex({ name: `${chatContextTable}_target_target_id_index`, columnNames: ['target', 'target_id'] });

    await queryRunner.createTable(chatContextBuilder, true);
    await queryRunner.createIndex(chatContextTable, chatContextIndex1);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(chatContextTable, `${chatContextTable}_target_target_id_index`);
    await queryRunner.dropTable(chatContextTable);
  }
}
