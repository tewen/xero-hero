# Xero Hero

Heroic utilities to simplify and enable your progress with the [xero-node](https://www.npmjs.com/package/xero-node) SDK.

## Modules

While all the exports are at the top level, the project documentation and organization is the same as the [Xero API](https://developer.xero.com/documentation/api/accounting/overview). 

## Common

Common utilities for functionality across different Xero APIs.

### Methods

#### dateInWhereFormat(date:Date)

Returns a date in the format required by the Xero API for the where parameter.

```TypeScript
import { dateInWhereFormat } from 'xero-hero';

const date = new Date();
const formattedDate = dateInWhereFormat(date);
console.log(formattedDate); // DateTime(2020, 12, 31)
```

## Accounting

You can read more about the Accounting API [here](https://developer.xero.com/documentation/api/accounting/overview).

### Contacts

You can read more about the Contacts API [here](https://developer.xero.com/documentation/api/contacts/overview).

#### Methods

##### getContactLink(contact:Contact | string)

Returns the link to the contact in the Xero UI.

```TypeScript
import { getContactLink } from 'xero-hero';

const contact = await xero.contacts.getContacts();
const link = getContactLink(contact[0]);
console.log(link); // https://go.xero.com/Contacts/View/12345678-1234-1234-1234-123456789012
```

### Invoices

You can read more about the Invoices API [here](https://developer.xero.com/documentation/api/invoices/overview).

#### Methods

##### getInvoiceLink(invoice:Invoice | string)

Returns the link to the invoice in the Xero UI.

```TypeScript
import { getInvoiceLink } from 'xero-hero';

const invoice = await xero.invoices.getInvoices();
const link = getInvoiceLink(invoice[0]);
console.log(link); // https://go.xero.com/AccountsReceivable/View.aspx?InvoiceID=12345678-1234-1234-1234-123456789012
```

#### filterInvoiceLineItems(invoice:Invoice, filter:DecisionFunction<LineItem>)

Filters the line items of an invoice by the given filter.

```TypeScript
import { filterInvoiceLineItems } from 'xero-hero';

const invoice = await xero.invoices.getInvoices();
const filteredLineItems = filterInvoiceLineItems(invoice[0], (lineItem) => lineItem.quantity > 1);
console.log(filteredLineItems); // [ { quantity: 2, ... }, { quantity: 3, ... } ]
```

### Journals

You can read more about the Journals API [here](https://developer.xero.com/documentation/api/journals/overview).

#### Methods

##### getManualJournalLink(journal:ManualJournal | string)

Returns the link to the journal in the Xero UI.

```TypeScript
import { getManualJournalLink } from 'xero-hero';

const journal = await xero.journals.getManualJournals();
const link = getManualJournalLink(journal[0]);
console.log(link); // https://go.xero.com/GeneralLedger/View.aspx?invoiceID=12345678-1234-1234-1234-123456789012
```

## Projects

You can read more about the Projects API [here](https://developer.xero.com/documentation/projects/overview).

### Methods

#### generateProjectAmountUSD(project:Project)

Generates the USD amount for a project.

```TypeScript
import {generateProjectAmountUSD} from 'xero-hero';
import {Amount} from 'xero-node/dist/gen/model/projects/amount';

const project = await xero.projects.getProjects();
const amount = generateProjectAmountUSD(project[0]);
console.log(amount instanceof Amount); // true
console.log(amount.currencyCode); // USD
```

## Acknowledgements

This package was generated using a tsup starter article found [here](https://dev.to/0xkoji/create-a-npm-package-template-with-typescript-and-tsup-328n).
