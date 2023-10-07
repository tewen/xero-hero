import qs from 'qs';
import type { Contact } from 'xero-node';

import { hasProperty } from '../../utils/properties';

export const getContactLink = (contact: Contact | string): string => {
  return `https://go.xero.com/Contacts/View.aspx?${qs.stringify({
    contactID:
      (hasProperty(contact, 'contactID')
        ? (contact as Contact).contactID
        : contact) || 'null-or-empty-contact-id',
  })}`;
};
