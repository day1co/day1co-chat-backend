import { FindOptionsOrder } from 'typeorm';

export type RowType = Record<string, any>;
export type IdType = number | string;
export type CommandType = RowType | Array<RowType>;

export type FilterColumns<T> = {
  [K in keyof T]?: T[K] | T[K][];
};

export interface Filter<ROW extends RowType = RowType> {
  // TODO: add exclude, min, max filter
  include?: FilterColumns<ROW>;
  since?: Date | string;
  until?: Date | string;
  sort?: FindOptionsOrder<ROW>;
  offset?: number;
  limit?: number;
}
