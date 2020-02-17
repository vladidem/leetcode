const { firstMissingPositive } = require('./index');

describe('41. First Missing Positive', () => {
  test('first missing positive should be found', () => {
    expect(firstMissingPositive([3, 4, -1, 1])).toBe(2);

    expect(firstMissingPositive([1, 2, 5, 8, -3])).toBe(3);

    expect(firstMissingPositive([-1, -2, 5, 8, -3])).toBe(1);
  });
});
