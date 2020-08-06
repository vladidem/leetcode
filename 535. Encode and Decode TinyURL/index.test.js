const { decode, encode } = require('./index');

describe('535. Encode and Decode TinyURL', () => {
  test('url should be encoded and correctly decoded', () => {
    const urls = [
      'https://leetcode.com/problems/design-tinyurl',
      'https://www.youtube.com',
      'https://outlook.office.com/',
      'https://vk.com/feed',
    ];
    const encodedUrls = urls.map((url) => ({ url, encoded: encode(url) }));

    encodedUrls.forEach(({ url, encoded }) => {
      expect(url).toEqual(decode(encoded));
    });
  });
});
