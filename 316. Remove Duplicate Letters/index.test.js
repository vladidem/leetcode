const { removeDuplicateLetters } = require('./index');

describe('316. Remove Duplicate Letters', () => {
  test('letters should be removed correctly', () => {
    expect(removeDuplicateLetters('abaaa')).toBe('ab');
    expect(removeDuplicateLetters('')).toBe('');
    expect(removeDuplicateLetters('bcabc')).toBe('abc');
    expect(removeDuplicateLetters('bbcaac')).toBe('bac');
    expect(removeDuplicateLetters('cbacdcbc')).toBe('acdb');
  });
});
