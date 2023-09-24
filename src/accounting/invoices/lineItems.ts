import { isNil } from 'deep-cuts';
import type { LineItem } from 'xero-node';

import type { DecisionFunction } from '../../types';

export const filterInvoiceLineItems = (
  lineItems: LineItem[],
  minCode: DecisionFunction<LineItem> | string | number,
  maxCode?: string | number,
): LineItem[] => {
  if (typeof minCode === 'function') {
    return (lineItems || []).filter(minCode);
  }

  const parsedMinCode = isNil(minCode)
    ? minCode
    : Number.parseInt(minCode as string, 10);
  const parsedMaxCode = isNil(maxCode)
    ? maxCode
    : Number.parseInt(maxCode as string, 10);
  if (parsedMinCode || parsedMaxCode) {
    return (lineItems || []).filter(({ itemCode }) => {
      const parsedItemCode = isNil(itemCode)
        ? itemCode
        : Number.parseInt(itemCode as string, 10);
      if (parsedItemCode) {
        const greaterThanOrEqualToMinCode = isNil(parsedMinCode)
          ? true
          : parsedItemCode >= parsedMinCode;
        const lessThanOrEqualToMaxCode = isNil(parsedMaxCode)
          ? true
          : parsedItemCode <= (parsedMaxCode || 0);
        return greaterThanOrEqualToMinCode && lessThanOrEqualToMaxCode;
      }

      return false;
    });
  }

  return lineItems || [];
};
