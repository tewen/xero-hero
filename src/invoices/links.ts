import {Invoice} from 'xero-node';

export const getInvoiceLink = (invoice:Invoice | string) =>
    `https://invoicing.xero.com/view/${invoice instanceof Invoice ? invoice.invoiceID : invoice}`;
