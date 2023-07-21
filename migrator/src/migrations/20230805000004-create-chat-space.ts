/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

const chatSpaceTable = 'chat_space';

export class ChatSpace20230805000004 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    const chatSpaceBuilder: Table = new Table({
      name: chatSpaceTable,
      columns: [
        { name: 'id', type: 'int', unsigned: true, isNullable: false, isGenerated: true, generationStrategy: 'increment', isPrimary: true },
        { name: 'state', type: 'varchar', isNullable: false, default: `'NORMAL'`, comment: '활성화 상태' },
        { name: 'space_id', type: 'varchar', isNullable: false, comment: '대화방을 관리하는 스페이스 ID'},
        { name: 'space_name', type: 'varchar', isNullable: true, comment: '스페이스명'},
        { name: 'created_at', type: 'datetime', isNullable: false, default: 'CURRENT_TIMESTAMP', comment: '생성일' }, 
        { name: 'updated_at', type: 'datetime', isNullable: false, default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', comment: '수정일' },
      ],
    });

    const chatSpaceIndex1: TableIndex = new TableIndex({ name: `${chatSpaceTable}_space_id_index`, columnNames: ['space_id'] });

    await queryRunner.createTable(chatSpaceBuilder, true);
    await queryRunner.createIndex(chatSpaceTable, chatSpaceIndex1);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(chatSpaceTable, `${chatSpaceTable}_space_id_index`);
    await queryRunner.dropTable(chatSpaceTable);
  }
}
