import { livePricesLunoMyr } from '../lib/luno.js';

test("Returns the BTC Price if successful", async () => {
  const MOCK_PRICE = 99

  global.fetch = jest.fn(() => Promise.resolve({
  status: 200,
  json: () => Promise.resolve({ last_trade: MOCK_PRICE })
}));
    expect(await livePricesLunoMyr()).toBe(MOCK_PRICE);
  });

  test("Returns an error in retrieving price", async () => {
    const MOCK_STATUS_CODE =500
    global.fetch = jest.fn(() => Promise.resolve({
      status: MOCK_STATUS_CODE,
      json: () => { }
  }));
  expect(await livePricesLunoMyr()).toBe("Failed to retrieve price");
});