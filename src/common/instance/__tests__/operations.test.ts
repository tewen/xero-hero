import {
  Contact,
  Invoice,
  LineAmountTypes,
  LineItem,
  LineItemItem,
} from 'xero-node';

import { deepClone } from '../../../';

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

/* eslint-disable functional/immutable-data */
describe('common/instance/operations', () => {
  describe('deepClone()', () => {
    it('should return undefined if passed undefined', () => {
      // @ts-expect-error - This is an invalid type for the function.
      expect(deepClone()).toBe(undefined);
    });

    it('should return null if passed null', () => {
      // @ts-expect-error - This is an invalid type for the function.
      expect(deepClone(null)).toBe(null);
    });

    it('should return a number of passed a number', () => {
      // @ts-expect-error - This is an invalid type for the function.
      expect(deepClone(572)).toBe(572);
    });

    it('should return a string if passed a string', () => {
      // @ts-expect-error - This is an invalid type for the function.
      expect(deepClone('Hello, my name is...')).toBe('Hello, my name is...');
    });

    it('should return a boolean if passed a boolean', () => {
      // @ts-expect-error - This is an invalid type for the function.
      expect(deepClone(true)).toBe(true);
    });

    it('should return a deep clone of a  simple object', () => {
      const original = {
        a: 1,
        b: {
          c: 2,
          d: {
            e: 3,
          },
        },
      };
      const clone = deepClone(original);
      expect(clone).toEqual(original);
      expect(clone).not.toBe(original);
      expect(clone.b).not.toBe(original.b);
      expect(clone.b.d).not.toBe(original.b.d);
    });

    it('should be able to clone a LineItem but not point to the original instance', () => {
      const lineItem = new LineItem();
      lineItem.unitAmount = 42;
      lineItem.quantity = 56;

      const clone = deepClone(lineItem);

      expect(clone).not.toBe(lineItem);
      expect(clone).toEqual(lineItem);
      expect(clone instanceof LineItem).toBe(true);
    });

    it('should play nice with sub references on a LineItem', () => {
      const lineItemItem = new LineItemItem();
      lineItemItem.name = 'Koolaid';

      const lineItem = new LineItem();
      lineItem.unitAmount = 42;
      lineItem.quantity = 56;
      lineItem.item = lineItemItem;

      const clone = deepClone(lineItem);

      expect(clone.item).not.toBe(lineItem.item);
      expect(clone.item).toEqual(lineItem.item);
      expect(clone.item instanceof LineItemItem).toBe(true);
    });

    it('should be able to clone an Invoice but not point to the original instance', () => {
      const invoice = new Invoice();
      invoice.reference = 'Recent Charges';

      const clone = deepClone(invoice);

      expect(clone).not.toBe(invoice);
      expect(clone).toEqual(invoice);
      expect(clone instanceof Invoice).toBe(true);
    });

    it('should play nice with sub references on an Invoice', () => {
      const contact = new Contact();
      contact.name = 'Koolaid Man';

      const invoice = new Invoice();
      invoice.reference = 'Recent Charges';
      invoice.contact = contact;

      const clone = deepClone(invoice);

      expect(clone.contact).not.toBe(invoice.contact);
      expect(clone.contact).toEqual(invoice.contact);
      expect(clone.contact instanceof Contact).toBe(true);
    });

    it('should play nice with sub reference collections on an invoice', () => {
      const lineItems = generateLineItemsWithCodes([1, 50, 5000]);

      const invoice = new Invoice();
      invoice.reference = 'Recent Charges';
      invoice.lineItems = lineItems;

      const clone = deepClone(invoice);

      for (let index = 0; index < lineItems.length; index++) {
        // @ts-expect-error - clone.lineItems should be defined.
        expect(clone.lineItems[index]).not.toBe(invoice.lineItems[index]);
        // @ts-expect-error - clone.lineItems should be defined.
        expect(clone.lineItems[index]).toEqual(invoice.lineItems[index]);
        // @ts-expect-error - clone.lineItems should be defined.
        expect(clone.lineItems[index] instanceof LineItem).toBe(true);
      }
    });

    it('should play nice with enums on an Invoice', () => {
      const invoice = new Invoice();
      invoice.reference = 'Recent Charges';
      invoice.lineAmountTypes = LineAmountTypes.Inclusive;

      const clone = deepClone(invoice);

      expect(clone.lineAmountTypes).toBe(invoice.lineAmountTypes);
    });

    it('should play nice with sub, sub references on an invoice', () => {
      const lineItemItem = new LineItemItem();
      lineItemItem.name = 'Koolaid';

      const lineItems = generateLineItemsWithCodes([777]);

      lineItems[0].item = lineItemItem;

      const invoice = new Invoice();
      invoice.reference = 'Recent Charges';
      invoice.lineItems = lineItems;

      const clone = deepClone(invoice);

      for (let index = 0; index < lineItems.length; index++) {
        // @ts-expect-error - clone.lineItems should be defined.
        expect(clone.lineItems[index].item).not.toBe(
          invoice.lineItems[index].item,
        );
        // @ts-expect-error - clone.lineItems should be defined.
        expect(clone.lineItems[index].item).toEqual(
          invoice.lineItems[index].item,
        );
        // @ts-expect-error - clone.lineItems should be defined.
        expect(clone.lineItems[index].item instanceof LineItemItem).toBe(true);
      }
    });
  });
});
/* eslint-enable functional/immutable-data */
