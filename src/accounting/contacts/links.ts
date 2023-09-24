import type { Contact } from 'xero-node';

import { hasProperty } from '../../utils/properties';

export const getContactLink = (contact: Contact | string): string => {
  return `https://go.xero.com/app/!kR4N6/contacts/contact/${
    (hasProperty(contact, 'contactID')
      ? (contact as Contact).contactID
      : contact) || 'null-or-empty-contact-id'
  }`;
};
