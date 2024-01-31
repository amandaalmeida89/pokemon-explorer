import { toUpperCase, parsedNumber } from '../utils/formatter';

describe('toUpperCase', () => {
  test('Should convert the first letter to uppercase', () => {
    const result = toUpperCase('hello');
    expect(result).toBe('Hello');
  });
});

describe('parsedNumber', () => {
  test('Should fill in left with zeros until desired length is reached', () => {
    const result = parsedNumber(42, 5, '0');
    expect(result).toBe('00042');
  });

  test('Should keep the number unchanged if you already reach or exceed the desired length', () => {
    const result = parsedNumber(12345, 3, '0');
    expect(result).toBe('12345');
  });

  test('Should work correctly with zero as input number', () => {
    const result = parsedNumber(0, 4, '0');
    expect(result).toBe('0000');
  });
});
