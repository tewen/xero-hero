import qs from 'qs';
import type { ManualJournal } from 'xero-node';

import { hasProperty } from '../../utils/properties';

export const getManualJournalLink = (
  manualJournal: ManualJournal | string,
): string => {
  return `https://go.xero.com/Journal/View.aspx?${qs.stringify({
    invoiceID:
      (hasProperty(manualJournal, 'manualJournalID')
        ? (manualJournal as ManualJournal).manualJournalID
        : manualJournal) || 'null-or-empty-manual-journal-id',
  })}`;
};
