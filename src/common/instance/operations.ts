import { isObject } from 'deep-cuts';

export const deepClone = <T extends object>(instance: T): T => {
  if (instance && isObject(instance)) {
    const { constructor } = instance;
    // @ts-expect-error - This is not passing for TypeScript, bit will for any Xero class.
    const clone = new constructor();
    /* eslint-disable guard-for-in, functional/immutable-data */
    for (const key in instance) {
      clone[key] = deepClone(instance[key] as object);
    }
    /* eslint-enable guard-for-in, functional/immutable-data */

    return clone;
  }

  return instance;
};
