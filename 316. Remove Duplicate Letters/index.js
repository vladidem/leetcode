require('../helpers/defineArrayLast')();

/**
 * @param {string} s
 * @return {{string: number}}
 */
const countChars = (s) => {
  const charsCount = {};

  for (const char of s) {
    const currentCount = charsCount[char] || 0;
    charsCount[char] = currentCount + 1;
  }

  return charsCount;
};

/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function (s) {
  if (s.length === 0) {
    return s;
  }
  const charsLeft = countChars(s);
  const stack = [];
  const used = {};

  for (const char of s) {
    charsLeft[char] -= 1;
    if (used[char]) {
      continue;
    }
    let last = stack.last();
    // while current top char in stack can be replaced
    while (
      // stack is not empty
      last &&
      // top stack char occurs later
      charsLeft[last] > 0 &&
      // top stack char is bigger, than current char of string
      // so keeping it will make string not the smallest in lexicographical order
      last > char
    ) {
      stack.pop();
      used[last] = false;
      last = stack.last();
    }
    used[char] = true;
    stack.push(char);
  }

  return stack.join('');
};

module.exports = { removeDuplicateLetters };
