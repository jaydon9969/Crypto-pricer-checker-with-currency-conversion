import { moneyExchangeConverter } from '../lib/exchange-rate.js';

const MOCK_CONVERT = 4

global.fetch = jest.fn(() => Promise.resolve({
    status: 200,
    json: () => Promise.resolve({ result: MOCK_CONVERT })
  }));

  test("Returns the BTC Price if successful", async () => {
    const result = await moneyExchangeConverter();
    expect(result).toBe(MOCK_CONVERT);
  });

  test("Returns error in retrieving conversion", async () => {
    const MOCK_STATUS_CODE_EXCHANGE =500
    global.fetch = jest.fn(() => Promise.resolve ({
      status: MOCK_STATUS_CODE_EXCHANGE,
      json: () => { }
    }));
    expect(await moneyExchangeConverter()).toBe(null);
  });