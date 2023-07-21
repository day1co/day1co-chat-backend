import { NotFoundException, ObjectUtil } from '@day1co/pebbles';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CommandType, Filter, RowType } from './base-dao.type';
import { applyFilter } from './support';

export class CerealBaseDao {
  constructor(protected repository: Repository<RowType>) {}

  async select(query?: Filter): Promise<Array<RowType>> {
    const where = applyFilter(query);

    const dataArray = await this.repository.find({
      where,
      skip: query?.offset,
      take: query?.limit,
      order: query?.sort,
    });
    return dataArray;
  }

  async selectFirst(query?: Filter): Promise<RowType> {
    const rows = await this.select({ ...query, limit: 1 });
    return rows[0];
  }

  async count(query?: Filter): Promise<number> {
    const where = applyFilter(query);
    return await this.repository.count({ where });
  }

  async save(command: CommandType): Promise<any> {
    return this.repository.save(command);
  }

  async updateById(id: number, command: CommandType): Promise<UpdateResult> {
    return this.repository.update({ id }, command);
  }

  async update(filter: Filter, command: CommandType): Promise<UpdateResult> {
    const where = applyFilter(filter);
    return this.repository.update(where, command);
  }

  async insert(command: CommandType): Promise<InsertResult> {
    const newEntity = this.repository.create(command);
    const result = await this.repository.insert(newEntity);
    return result;
  }

  async delete(command: Filter): Promise<DeleteResult> {
    const where = applyFilter(command);
    const data = await this.repository.find({ where });
    if (!data || ObjectUtil.isEmpty(data)) {
      throw new NotFoundException(`data is not exist`);
    }
    return await this.repository.delete(where);
  }
}
