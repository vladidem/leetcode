const { validIPAddress, IPv4, IPv6, neither } = require('./index');

describe('468. Validate IP address', () => {
  test('IPv4 should be valid', () => {
    expect(validIPAddress('172.16.254.1')).toBe(IPv4);

    expect(validIPAddress('100.0.254.1')).toBe(IPv4);

    expect(validIPAddress('192.168.0.1')).toBe(IPv4);
  });

  test('IPv6 should be valid', () => {
    expect(validIPAddress('2001:0db8:85a3:0:0:8a2e:0370:7334')).toBe(IPv6);

    expect(validIPAddress('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(
      IPv6,
    );

    expect(validIPAddress('2001:0db8:85a3:0:0:8A2E:0370:7334')).toBe(IPv6);
  });

  test('invalid addresses should be invalid', () => {
    expect(validIPAddress('256.256.256.256')).toBe(neither);

    expect(validIPAddress('02001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(
      neither,
    );

    expect(validIPAddress('2001:0db8:85a3::8A2E:0370:7334')).toBe(neither);

    expect(validIPAddress('20EE:FGb8:85a3:0:0:8A2E:0370:7334')).toBe(neither);
  });
});
