import { Amount } from 'xero-node/dist/gen/model/projects/amount';
import { CurrencyCode } from 'xero-node/dist/gen/model/projects/currencyCode';

export const generateProjectAmountUSD = (value: number): Amount => {
  const amount = new Amount();
  /* eslint-disable functional/immutable-data */
  amount.currency = CurrencyCode.USD;
  amount.value = value;
  /* eslint-enable functional/immutable-data */
  return amount;
};
