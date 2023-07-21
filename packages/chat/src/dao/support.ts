import { In, IsNull, And, MoreThanOrEqual, LessThan } from 'typeorm';
import { Filter } from './base-dao.type';

export const canExactMatch = (value: unknown): value is Date | number | string => {
  return Number.isInteger(value) || typeof value === 'string' || value instanceof Date;
};

export const canExactMatchIn = (value: unknown): value is Array<Date | number | string> => {
  return Array.isArray(value) && value.every((it) => canExactMatch(it));
};

export const isNull = (value: unknown): value is null => {
  return value === null;
};

export const applyFilter = (query?: Filter): Record<string, any> => {
  if (!query) {
    return {};
  }

  // TODO: add exclude filter
  const where: Record<string, any> = {};
  const { include = {}, since, until } = query;

  if (include) {
    for (const [key, value] of Object.entries(include)) {
      if (canExactMatch(value)) {
        where[key] = value;
      } else if (canExactMatchIn(value)) {
        where[key] = In(value);
      } else if (isNull(value)) {
        where[key] = IsNull();
      }
    }
  }

  if (canExactMatch(since) && canExactMatch(until)) {
    where.createdAt = And(MoreThanOrEqual(since), LessThan(until));
  } else if (canExactMatch(since)) {
    where.createdAt = MoreThanOrEqual(since);
  } else if (canExactMatch(until)) {
    where.createdAt = LessThan(until);
  }

  return where;
};
