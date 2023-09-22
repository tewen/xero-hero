import { generateProjectAmountUSD } from '../../';

describe('projects/generators', () => {
  describe('generateAmount()', () => {
    it('should return an Amount object with the given value as the USD Currency', () => {
      const amount = generateProjectAmountUSD(1000);
      expect(amount).toEqual({
        currency: 'USD',
        value: 1000,
      });
    });
  });
});
