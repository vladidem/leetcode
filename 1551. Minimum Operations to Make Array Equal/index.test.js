const { minOperations } = require('./index');

describe('1551. Minimum Operations to Make Array Equal', () => {
  test('Operations counted correctly', () => {
    expect(minOperations(3)).toBe(2);
    expect(minOperations(6)).toBe(9);
  });
});
