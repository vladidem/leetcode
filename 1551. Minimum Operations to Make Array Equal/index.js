/**
 * Amount of operations is equal to the summ of arithmetic progression
 * Progression starts from the middle of numbers
 *
 * For odd lengths, 2 operations are needed to make numbers equal: 1, 3, 5 => 2, 3, 4 => 3, 3, 3
 * For even lengths, 1 operation is needed to make numbers equal: 1, 3, 5, 7 => 1, 4, 4, 7
 * Each step away from middle needs 2 more operations
 *
 * @param {number} n
 * @return {number}
 */
var minOperations = function (len) {
  const n = Math.floor(len / 2);
  const a = len % 2 === 0 ? 1 : 2;
  const d = 2;
  const summ = (n * (2 * a + d * (n - 1))) / 2;

  return summ;
};

module.exports = { minOperations };
