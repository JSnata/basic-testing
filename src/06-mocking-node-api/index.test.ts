import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 3000);
    jest.advanceTimersByTime(3000);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 3000);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 3000);
    jest.advanceTimersByTime(3000);

    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(3000);

    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, 3000);

    jest.advanceTimersByTime(9000);
  
    expect(callback).toHaveBeenCalledTimes(3);
  
    jest.advanceTimersByTime(3000);
  
    expect(callback).toHaveBeenCalledTimes(4);
  });
});

jest.mock('path', () => ({
  join: jest.fn(),
}));

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

describe('readFileAsynchronously', () => {
  const file = 'file.txt';
  const pathToFile = '/directory/file.txt';
  
  beforeEach(() => {
    (join as jest.Mock).mockReturnValue(pathToFile);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(file);
    expect(join).toHaveBeenCalledWith(__dirname, file);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously(file);
    expect(result).toBeNull();
    expect(existsSync).toHaveBeenCalledWith(pathToFile);
    expect(readFile).not.toHaveBeenCalled();
  });

  test('should return file content if file exists', async () => {
    const content = 'content';
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from(content));

    const result = await readFileAsynchronously(file);
    expect(result).toBe(content);
    expect(readFile).toHaveBeenCalledWith(pathToFile);
  });
});
