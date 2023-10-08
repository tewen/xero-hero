import type { Amount, CurrencyCode } from './shimTypes';

export const generateProjectAmountUSD = (value: number): Amount => {
  const amount = {} as Amount;
  /* eslint-disable functional/immutable-data */
  amount.currency = 'USD' as unknown as CurrencyCode;
  amount.value = value;
  /* eslint-enable functional/immutable-data */
  return amount;
};
