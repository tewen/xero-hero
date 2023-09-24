import { Contact } from 'xero-node';

export const getContactLink = (contact: Contact | string): string => {
  return `https://go.xero.com/app/!kR4N6/contacts/contact/${
    (contact instanceof Contact ? contact.contactID : contact) ||
    'null-or-empty-contact-id'
  }`;
};
