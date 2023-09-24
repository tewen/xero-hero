import { ManualJournal } from 'xero-node';

import { getManualJournalLink } from '../../../';

describe('journals/links', () => {
  describe('getManualJournalLink()', () => {
    it('returns a null indicator if passed undefined', () => {
      // @ts-expect-error - This is an invalid type for the function.
      expect(getManualJournalLink()).toBe(
        'https://go.xero.com/Journal/View.aspx?invoiceID=null-or-empty-manual-journal-id',
      );
    });

    it('returns a null indicator if passed null', () => {
      // @ts-expect-error - This is an invalid type for the function.
      expect(getManualJournalLink(null)).toBe(
        'https://go.xero.com/Journal/View.aspx?invoiceID=null-or-empty-manual-journal-id',
      );
    });

    it('returns a null indicator if passed an empty string', () => {
      expect(getManualJournalLink('')).toBe(
        'https://go.xero.com/Journal/View.aspx?invoiceID=null-or-empty-manual-journal-id',
      );
    });

    it('returns the correct URL for a manual journal object with an manualJournalID property', () => {
      const manualJournal = new ManualJournal();
      /* eslint-disable functional/immutable-data */
      manualJournal.manualJournalID = '25OR6TO4';
      /* eslint-enable functional/immutable-data */
      expect(getManualJournalLink(manualJournal)).toBe(
        'https://go.xero.com/Journal/View.aspx?invoiceID=25OR6TO4',
      );
    });

    it('returns the correct URL for a string manual journal ID', () => {
      expect(getManualJournalLink('sdfhj-47629-sjdgdd')).toBe(
        'https://go.xero.com/Journal/View.aspx?invoiceID=sdfhj-47629-sjdgdd',
      );
    });

    it('should work with an object that matches the interface for having a manualJournalID property', () => {
      const manualJournal = { manualJournalID: '25OR6TO4' };
      // @ts-expect-error - This is an invalid type for the function.
      expect(getManualJournalLink(manualJournal)).toBe(
        'https://go.xero.com/Journal/View.aspx?invoiceID=25OR6TO4',
      );
    });
  });
});
