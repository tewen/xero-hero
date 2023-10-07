import { Contact } from 'xero-node';

import { getContactLink } from '../../../index';

describe('contacts/links', () => {
  describe('getContactLink()', () => {
    it('returns a null indicator if passed undefined', () => {
      // @ts-expect-error - This is an invalid type for the function.
      expect(getContactLink()).toBe(
        'https://go.xero.com/Contacts/View.aspx?contactID=null-or-empty-contact-id',
      );
    });

    it('returns a null indicator if passed null', () => {
      // @ts-expect-error - This is an invalid type for the function.
      expect(getContactLink(null)).toBe(
        'https://go.xero.com/Contacts/View.aspx?contactID=null-or-empty-contact-id',
      );
    });

    it('returns a null indicator if passed an empty string', () => {
      expect(getContactLink('')).toBe(
        'https://go.xero.com/Contacts/View.aspx?contactID=null-or-empty-contact-id',
      );
    });

    it('returns the correct URL for an contact object with an contactID property', () => {
      const contact = new Contact();
      /* eslint-disable functional/immutable-data */
      contact.contactID = '25OR6TO4';
      /* eslint-enable functional/immutable-data */
      expect(getContactLink(contact)).toBe(
        'https://go.xero.com/Contacts/View.aspx?contactID=25OR6TO4',
      );
    });

    it('returns the correct URL for a string invoice ID', () => {
      expect(getContactLink('kooolaid-9086-t728')).toBe(
        'https://go.xero.com/Contacts/View.aspx?contactID=kooolaid-9086-t728',
      );
    });

    it('should work with an object that matches the interface for having a contactID property', () => {
      const contact = {
        contactID: '25OR6TO4',
      };
      expect(getContactLink(contact)).toBe(
        'https://go.xero.com/Contacts/View.aspx?contactID=25OR6TO4',
      );
    });
  });
});
