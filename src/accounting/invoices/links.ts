import type { Invoice } from 'xero-node';

import { hasProperty } from '../../utils/properties';

export const getInvoiceLink = (invoice: Invoice | string): string => {
  return `https://invoicing.xero.com/view/${
    (hasProperty(invoice, 'invoiceID')
      ? (invoice as Invoice).invoiceID
      : invoice) || 'null-or-empty-invoice-id'
  }`;
};
