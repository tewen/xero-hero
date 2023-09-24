import type { PropertyOrFunction } from '../types';

const getKey = <T extends Record<string, any>>(
  item: T,
  property: PropertyOrFunction<T>,
): string => {
  return typeof property === 'function' ? property(item) : item[property];
};

export const keyBy = <T extends Record<string, any>>(
  ar: T[],
  property: PropertyOrFunction<T>,
): Record<string, T> => {
  return (ar || []).reduce(
    (accumulator, item) => {
      const key = getKey(item, property);
      /* eslint-disable functional/immutable-data */
      accumulator[key] = item;
      /* eslint-enable functional/immutable-data */
      return accumulator;
    },
    {} as Record<string, T>,
  );
};

export const groupBy = <T extends Record<string, any>>(
  ar: T[],
  property: PropertyOrFunction<T>,
): Record<string, T[]> => {
  return (ar || []).reduce(
    (accumulator, item) => {
      const key = getKey(item, property);
      /* eslint-disable functional/immutable-data */
      accumulator[key] = accumulator[key] || [];
      (accumulator[key] as T[]).push(item);
      /* eslint-enable functional/immutable-data */
      return accumulator;
    },
    {} as Record<string, T[]>,
  );
};
