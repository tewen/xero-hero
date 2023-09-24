import { DateTime } from 'luxon';

import { dateInWhereFormat } from '../../../';

describe('common/where/generators', () => {
  describe('dateInWhereFormat()', () => {
    it('should throw an error if passed undefined', () => {
      expect(() => {
        // @ts-expect-error - This is an invalid type for the function.
        return dateInWhereFormat();
      }).toThrowError(
        new Error('You must pass in a valid JavaScript Date object.'),
      );
    });

    it('should throw an error if passed null', () => {
      expect(() => {
        // @ts-expect-error - This is an invalid type for the function.
        return dateInWhereFormat(null);
      }).toThrowError(
        new Error('You must pass in a valid JavaScript Date object.'),
      );
    });

    it('should return the date in Xero where format', () => {
      const dateTime = DateTime.fromObject({ day: 5, month: 9, year: 1995 });
      expect(dateInWhereFormat(dateTime.toJSDate())).toBe(
        'DateTime(1995, 9, 5)',
      );
    });
  });
});
