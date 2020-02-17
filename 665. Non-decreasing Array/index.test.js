const { checkPossibility } = require('./index');

describe('665. Non-decreasing Array', () => {
  test('array should be fixable', () => {
    expect(checkPossibility([1, 2, 4, 5, 3])).toBe(true);
  });

  test('array should not be fixable', () => {
    expect(checkPossibility([4, 2, 1])).toBe(false);
  });
});
