import { roundToNearestFraction } from 'deep-cuts';

import type { TimeEntry } from './shimTypes';

export const hoursFromTimeEntries = (
  timeEntries: TimeEntry[],
  denominator: number = 4,
  maxDecimalPlaces: number = 2,
): number | undefined => {
  const totalMinutes = timeEntries.reduce((totalMinutes, timeEntry) => {
    const duration = timeEntry.duration || 0;
    return totalMinutes + duration;
  }, 0);
  return roundToNearestFraction(
    totalMinutes / 60,
    denominator,
    maxDecimalPlaces,
  );
};
