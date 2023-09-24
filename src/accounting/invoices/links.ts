import { Invoice } from 'xero-node';

export const getInvoiceLink = (invoice: Invoice | string): string => {
  return `https://invoicing.xero.com/view/${
    (invoice instanceof Invoice ? invoice.invoiceID : invoice) ||
    'null-or-empty-invoice-id'
  }`;
};
