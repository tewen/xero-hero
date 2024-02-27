import {
  BankTransaction,
  BankTransactions,
  Contact,
  Contacts,
  Invoice,
  Invoices,
  RepeatingInvoices,
} from 'xero-node';

import { getListFromResponse } from '../../../';

describe('common/response/selectors', () => {
  describe('getListFromResponse()', () => {
    it('should return the contacts list from a contacts response', () => {
      const contactsList = [new Contact(), new Contact(), new Contact()];
      const contactsBody = new Contacts();
      contactsBody.contacts = contactsList; // eslint-disable-line functional/immutable-data
      expect(getListFromResponse({ body: contactsBody })).toBe(contactsList);
    });

    it('should return the invoice list from a invoices response', () => {
      const invoicesList = [new Invoice(), new Invoice()];
      const invoicesBody = new Invoices();
      invoicesBody.invoices = invoicesList; // eslint-disable-line functional/immutable-data
      expect(getListFromResponse({ body: invoicesBody })).toBe(invoicesList);
    });

    it('should return the bankTransactions from a bankTransactions response', () => {
      const bankTransactionsList = [
        new BankTransaction(),
        new BankTransaction(),
        new BankTransaction(),
        new BankTransaction(),
      ];
      const bankTransactionsBody = new BankTransactions();
      bankTransactionsBody.bankTransactions = bankTransactionsList; // eslint-disable-line functional/immutable-data
      expect(getListFromResponse({ body: bankTransactionsBody })).toBe(
        bankTransactionsList,
      );
    });

    it('should play nice with an object that looks like a Xero response and has an array property on the body', () => {
      const itemList = [1, 2, 3, 4, 5];
      const itemBody = { items: itemList };
      expect(getListFromResponse({ body: itemBody })).toBe(itemList);
    });

    it('should return undefined for responses that lack an array property', () => {
      const repeatingInvoices = new RepeatingInvoices();
      expect(getListFromResponse({ body: repeatingInvoices })).toBe(undefined);
    });

    it('should return undefined for responses without a body', () => {
      // @ts-expect-error - This is an invalid type for the function.
      expect(getListFromResponse({})).toBe(undefined);
    });

    it('should throw an error when passed an undefined response', () => {
      expect(() => {
        // @ts-expect-error - This is an invalid type for the function.
        return getListFromResponse();
      }).toThrowError();
    });

    it('should throw an error when passed a null response', () => {
      expect(() => {
        // @ts-expect-error - This is an invalid type for the function.
        return getListFromResponse(null);
      }).toThrowError();
    });
  });
});
