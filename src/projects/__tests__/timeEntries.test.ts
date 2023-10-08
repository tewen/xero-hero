import { hoursFromTimeEntries } from '../../';
import type { TimeEntry } from '../shimTypes';

describe('projects/timeEntries', () => {
  describe('hoursFromTimeEntries()', () => {
    it('should throw an error if passed undefined', () => {
      expect(() => {
        // @ts-expect-error - This is an invalid type for the function.
        return hoursFromTimeEntries();
      }).toThrowError();
    });

    it('should throw an error if passed null', () => {
      expect(() => {
        // @ts-expect-error - This is an invalid type for the function.
        return hoursFromTimeEntries(null);
      }).toThrowError();
    });

    it('should return 0 if passed an empty array', () => {
      expect(hoursFromTimeEntries([])).toBe(0);
    });

    it('should return the total hours from the given TimeEntries, defaulting to the nearest 15 minutes', () => {
      const timeEntries = [
        {
          duration: 60,
        },
        {
          duration: 30,
        },
        {
          duration: 18,
        },
      ];
      expect(hoursFromTimeEntries(timeEntries)).toBe(1.75);
    });

    it('should play nice with a non-default denominator for rounding', () => {
      /* eslint-disable functional/immutable-data */
      const timeEntryA = {} as unknown as TimeEntry;
      timeEntryA.duration = 60;
      const timeEntryB = {} as unknown as TimeEntry;
      timeEntryB.duration = 23;
      /* eslint-enable functional/immutable-data */
      const timeEntries = [timeEntryA, timeEntryB];
      expect(hoursFromTimeEntries(timeEntries, 10)).toBe(1.4);
    });

    it('should play nice with non-standard decimal places for rounding / fixed numbers', () => {
      const timeEntries = [
        {
          duration: 60,
        },
        {
          duration: 30,
        },
        {
          duration: 18,
        },
      ];
      expect(hoursFromTimeEntries(timeEntries, 2, 0)).toBe(2);
    });

    it('should sub in 0 when a Time Entry is missing a duration', () => {
      /* eslint-disable functional/immutable-data */
      const timeEntryA = {} as unknown as TimeEntry;
      const timeEntryB = {} as unknown as TimeEntry;
      timeEntryB.duration = 23;
      /* eslint-enable functional/immutable-data */
      const timeEntries = [timeEntryA, timeEntryB];
      expect(hoursFromTimeEntries(timeEntries, 10)).toBe(0.4);
    });
  });
});
