import { Invoice } from 'xero-node';

import { getInvoiceLink } from '../../../index';

describe('invoices/links', () => {
  describe('getInvoiceLink()', () => {
    it('returns a null indicator if passed undefined', () => {
      // @ts-expect-error - This is an invalid type for the function.
      expect(getInvoiceLink()).toBe(
        'https://invoicing.xero.com/view/null-or-empty-invoice-id',
      );
    });

    it('returns a null indicator if passed null', () => {
      // @ts-expect-error - This is an invalid type for the function.
      expect(getInvoiceLink(null)).toBe(
        'https://invoicing.xero.com/view/null-or-empty-invoice-id',
      );
    });

    it('returns a null indicator if passed an empty string', () => {
      expect(getInvoiceLink('')).toBe(
        'https://invoicing.xero.com/view/null-or-empty-invoice-id',
      );
    });

    it('returns the correct URL for an invoice object with an invoiceID property', () => {
      const invoice = new Invoice();
      /* eslint-disable functional/immutable-data */
      invoice.invoiceID = '25OR6TO4';
      /* eslint-enable functional/immutable-data */
      expect(getInvoiceLink(invoice)).toBe(
        'https://invoicing.xero.com/view/25OR6TO4',
      );
    });

    it('returns the correct URL for a string invoice ID', () => {
      expect(getInvoiceLink('kooolaid-9086-t728')).toBe(
        'https://invoicing.xero.com/view/kooolaid-9086-t728',
      );
    });
  });
});
