import { LineItem } from 'xero-node';

import { filterInvoiceLineItems } from '../../';

const generateLineItemsWithCodes = (
  itemCodes: (string | number)[],
): LineItem[] => {
  return itemCodes.map(itemCode => {
    const lineItem = new LineItem();
    /* eslint-disable functional/immutable-data */
    lineItem.itemCode = String(itemCode);
    /* eslint-enable functional/immutable-data */
    return lineItem;
  });
};

describe('invoices/lineItems', () => {
  describe('filterInvoiceLineItems()', () => {
    it('should return an empty array when passed undefined', () => {
      // @ts-expect-error - This is an invalid type for the function.
      expect(filterInvoiceLineItems(undefined, 1000)).toEqual([]);
    });

    it('should return an empty array when passed null', () => {
      // @ts-expect-error - This is an invalid type for the function.
      expect(filterInvoiceLineItems(null, String(0))).toEqual([]);
    });

    it('should return an empty array when passed an empty array', () => {
      expect(filterInvoiceLineItems([], 5500)).toEqual([]);
    });

    it('should return all given line items when no min, max, or decision function is provided', () => {
      const lineItems = generateLineItemsWithCodes([1, 50, 5000]);
      // @ts-expect-error - This is an invalid type for the function.
      const filteredLineItems = filterInvoiceLineItems(lineItems);
      expect(filteredLineItems).toHaveLength(3);
      expect(filteredLineItems[0].itemCode).toBe('1');
      expect(filteredLineItems[1].itemCode).toBe('50');
      expect(filteredLineItems[2].itemCode).toBe('5000');
    });

    it('should remove line items without an item code in the case of an item code match', () => {
      const lineItems = generateLineItemsWithCodes([1, 50, 5000]);
      const emptyLineItem = new LineItem();
      const filteredLineItems = filterInvoiceLineItems(
        lineItems.concat(emptyLineItem),
        0,
        10_000,
      );
      expect(filteredLineItems).toHaveLength(3);
      expect(filteredLineItems[0].itemCode).toBe('1');
      expect(filteredLineItems[1].itemCode).toBe('50');
      expect(filteredLineItems[2].itemCode).toBe('5000');
    });

    it('should return line items above the min if only given a min', () => {
      const lineItems = generateLineItemsWithCodes([1, 50, 5000]);
      const filteredLineItems = filterInvoiceLineItems(lineItems, 50);
      expect(filteredLineItems).toHaveLength(2);
      expect(filteredLineItems[0].itemCode).toBe('50');
      expect(filteredLineItems[1].itemCode).toBe('5000');
    });

    it('should return line items above the min if only given a min of string type', () => {
      const lineItems = generateLineItemsWithCodes([280, 7001, 2400]);
      const filteredLineItems = filterInvoiceLineItems(lineItems, '7000');
      expect(filteredLineItems).toHaveLength(1);
      expect(filteredLineItems[0].itemCode).toBe('7001');
    });

    it('should return line items below the max if only given a max', () => {
      const lineItems = generateLineItemsWithCodes([280, 7001, 2400]);
      const filteredLineItems = filterInvoiceLineItems(
        lineItems,
        // @ts-expect-error - This is an invalid type for the function.
        undefined,
        2500,
      );
      expect(filteredLineItems).toHaveLength(2);
      expect(filteredLineItems[0].itemCode).toBe('280');
      expect(filteredLineItems[1].itemCode).toBe('2400');
    });

    it('should return line items below the max if only given a max of string type', () => {
      const lineItems = generateLineItemsWithCodes([280, 7001, 2400]);
      const filteredLineItems = filterInvoiceLineItems(
        lineItems,
        // @ts-expect-error - This is an invalid type for the function.
        undefined,
        '280',
      );
      expect(filteredLineItems).toHaveLength(1);
      expect(filteredLineItems[0].itemCode).toBe('280');
    });

    it('should return line items in between the min and the max inclusive', () => {
      const lineItems = generateLineItemsWithCodes([1, 29_000, 2726, 4846]);
      const filteredLineItems = filterInvoiceLineItems(lineItems, 1, 2726);
      expect(filteredLineItems).toHaveLength(2);
      expect(filteredLineItems[0].itemCode).toBe('1');
      expect(filteredLineItems[1].itemCode).toBe('2726');
    });

    it('should return line items in between the min and the max inclusive, when string types', () => {
      const lineItems = generateLineItemsWithCodes([1, 29_000, 2726, 4846]);
      const filteredLineItems = filterInvoiceLineItems(
        lineItems,
        '2726',
        '29000',
      );
      expect(filteredLineItems).toHaveLength(3);
      expect(filteredLineItems[0].itemCode).toBe('29000');
      expect(filteredLineItems[1].itemCode).toBe('2726');
      expect(filteredLineItems[2].itemCode).toBe('4846');
    });

    it('should be able to return line items based on a decision function', () => {
      const lineItems = generateLineItemsWithCodes([1, 29_000, 2726, 4846]).map(
        (lineItem, index) => {
          /* eslint-disable functional/immutable-data */
          lineItem.lineAmount = index * 100;
          /* eslint-enable functional/immutable-data */
          return lineItem;
        },
      );
      const filteredLineItems = filterInvoiceLineItems(lineItems, lineItem => {
        return (lineItem.lineAmount || 0) > 199;
      });
      expect(filteredLineItems).toHaveLength(2);
    });

    it('should ignore the max when a decision function is provided', () => {
      const lineItems = generateLineItemsWithCodes([1, 29_000, 2726, 4846]).map(
        (lineItem, index) => {
          /* eslint-disable functional/immutable-data */
          lineItem.lineAmount = index * 100;
          /* eslint-enable functional/immutable-data */
          return lineItem;
        },
      );
      const filteredLineItems = filterInvoiceLineItems(
        lineItems,
        lineItem => {
          return (lineItem.lineAmount || 0) > 199;
        },
        10,
      );
      expect(filteredLineItems).toHaveLength(2);
    });
  });
});
