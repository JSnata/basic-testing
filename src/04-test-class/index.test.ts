import { getBankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const instance = getBankAccount(300);
    expect(instance.getBalance()).toBe(300);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const instance = getBankAccount(300);
    expect(() => instance.withdraw(305)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const instance = getBankAccount(300);
    const accountTransferTo = getBankAccount(300);
    expect(() => instance.transfer(305, accountTransferTo)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const instance = getBankAccount(300);
    expect(() => instance.transfer(305, instance)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const instance = getBankAccount(300);
    instance.deposit(30)
    expect(instance.getBalance()).toBe(330);
  });

  test('should withdraw money', () => {
    const instance = getBankAccount(300);
    instance.withdraw(30)
    expect(instance.getBalance()).toBe(270);
  });

  test('should transfer money', () => {
    const instance = getBankAccount(300);
    const accountTransferTo = getBankAccount(300);
    instance.transfer(30, accountTransferTo);
    expect(instance.getBalance()).toBe(270);
    expect(accountTransferTo.getBalance()).toBe(330);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const instance = getBankAccount(300);
    const balance = await instance.fetchBalance();

    if (balance !== null) {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const instance = getBankAccount(300);

    jest.spyOn(instance, 'fetchBalance').mockResolvedValue(500);

    await instance.synchronizeBalance();

    expect(instance.getBalance()).toBe(500);
  });
  

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const instance = getBankAccount(300);
  
    jest.spyOn(instance, 'fetchBalance').mockResolvedValue(null);
  
    await expect(instance.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
  });
})
