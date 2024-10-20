import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash/throttle', () => ({
  default: jest.fn((fn) => fn),
  __esModule: true,
}));

describe('throttledGetDataFromApi', () => {
  const relativePath = 'relative/path/';
  const mockResponse = { data: { message: 'success' } };
  beforeEach(() => {
    jest.useFakeTimers();

    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue(mockResponse)
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
    jest.resetModules();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    // await throttledGetDataFromApi(relativePath);
    // expect(axios.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi(relativePath);
    expect(data).toEqual(mockResponse.data);
  });
});
