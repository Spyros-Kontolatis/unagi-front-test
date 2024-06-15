import type { SortOrderDirection } from '../types';
import { compareAsc, compareDesc, isValid, parse } from 'date-fns';

const parseDate = (date: string) => {
  const refDate = new Date(Date.UTC(0, 0, 0, 0, 0, 0));
  return parse(date, 'd MMM yyyy', refDate);
};

const getValue = <T>(key: string, initial: T): string | number | Date =>
  key.split('.').reduce((acc, curr) => (curr ? acc[curr] : acc), initial);

export const sort = <T>(
  initialArray: T[],
  key: string,
  order: SortOrderDirection,
) =>
  initialArray.sort((a, b) => {
    let first = getValue(key, a);
    let second = getValue(key, b);
    const firstDate = parseDate(first?.toString() ?? '');
    const secondDate = parseDate(second?.toString() ?? '');
    const isDate = isValid(firstDate) && isValid(secondDate);
    if (isDate)
      return order === 'asc'
        ? compareAsc(firstDate, secondDate)
        : compareDesc(firstDate, secondDate);
    if (typeof first === 'string' && typeof second === 'string') {
      first = first.toLowerCase();
      second = second.toLowerCase();
    }
    if (first < second) return order === 'asc' ? -1 : 1;
    else if (first === second) return 0;
    return order === 'asc' ? 1 : -1;
  });
