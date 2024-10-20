import { resolveValue, throwError, throwCustomError, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue(1);
    expect(result).toBe(1);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('this is a bad error')).toThrow('this is a bad error');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError); 
  });
});
