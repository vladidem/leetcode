const IPv4 = 'IPv4';
const IPv6 = 'IPv6';
const neither = 'Neither';

const notInIPv4Bounds = (number) => {
  return number > 255 || number < 0;
};

/**
 * @param {string} ip
 * @return {boolean}
 */
const isIPv4 = (ip) => {
  const numbers = ip.split('.');

  if (numbers.length != 4) {
    return false;
  }

  for (const number of numbers) {
    const parsedNumber = parseInt(number);

    if (
      isNaN(parsedNumber) ||
      notInIPv4Bounds(parsedNumber) ||
      parsedNumber.toString() != number
    ) {
      return false;
    }
  }

  return true;
};

const hasTooMuchTrailingZeros = (s) => {
  return s[0] === '0' && s.length > 4;
};

const leftTrimChar = (string, charToRemove) => {
  while (string.charAt(0) == charToRemove && string.length > 1) {
    string = string.substring(1);
  }

  return string;
};

const containsInvalidHexChars = (string) => {
  if (string === '0') {
    return false;
  }

  const parsed = parseInt(string, 16);

  if (leftTrimChar(string, '0') !== parsed.toString(16)) {
    return true;
  }

  return false;
};

const notInIPv6Bounds = (number) => {
  return number >= Math.pow(16, 4) || number < 0;
};

/**
 * @param {string} ip
 * @return {boolean}
 */
const isIPv6 = (ip) => {
  const numbers = ip.split(':').map((n) => n.toLowerCase());

  if (numbers.length != 8) {
    return false;
  }

  for (const number of numbers) {
    const parsedNumber = parseInt(number, 16);

    if (
      isNaN(parsedNumber) ||
      hasTooMuchTrailingZeros(number) ||
      notInIPv6Bounds(parsedNumber) ||
      containsInvalidHexChars(number)
    ) {
      return false;
    }
  }

  return true;
};

/**
 * @param {string} ip
 * @return {string}
 */
const validIPAddress = function(ip) {
  if (isIPv4(ip)) {
    return IPv4;
  }

  if (isIPv6(ip)) {
    return IPv6;
  }

  return neither;
};

module.exports = { validIPAddress, IPv4, IPv6, neither };
