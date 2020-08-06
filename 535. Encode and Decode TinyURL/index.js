const base = 'http://tinyurl.com';
const slugSize = 6;

class UrlEncoder {
  constructor() {
    this.urls = new Map();
  }

  encode(longUrl) {
    let url;
    do {
      url = this.generateRandomUrl();
    } while (this.urls.has(url));

    this.urls.set(url, longUrl);

    return url;
  }

  decode(shortUrl) {
    return this.urls.get(shortUrl);
  }

  generateRandomUrl() {
    return `${base}/${this.generateRandomSlug()}`;
  }

  generateRandomSlug() {
    // shift is needed to cut out .
    const shift = 2;
    return Math.random()
      .toString(36)
      .substring(shift, shift + slugSize);
  }
}

const encoder = new UrlEncoder();

/**
 * Encodes a URL to a shortened URL.
 *
 * @param {string} longUrl
 * @return {string}
 */
const encode = (longUrl) => encoder.encode(longUrl);

/**
 * Decodes a shortened URL to its original URL.
 *
 * @param {string} shortUrl
 * @return {string}
 */
const decode = (shortUrl) => encoder.decode(shortUrl);

module.exports = { decode, encode };
