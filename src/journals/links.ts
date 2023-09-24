import qs from 'qs';
import { ManualJournal } from 'xero-node';

export const getManualJournalLink = (
  manualJournal: ManualJournal | string,
): string => {
  return `https://go.xero.com/Journal/View.aspx?${qs.stringify({
    invoiceID:
      (manualJournal instanceof ManualJournal
        ? manualJournal.manualJournalID
        : manualJournal) || 'null-or-empty-manual-journal-id',
  })}`;
};
