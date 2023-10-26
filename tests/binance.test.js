import { livePricesBinance } from '../lib/binance.js';

beforeEach (() => {
  jest.resetModules();
});


test("Returns price if Binance request succeeds", async () => {
    const livePricesBinance = require('../lib/binance.js').livePricesBinance
  
    // mocking the entire node-binance-api module
    jest.mock('node-binance-api', () => {
      return class Binance {
        // we use only the prices method for this particular test, so we'll mock just this method
        prices() {
          return new Promise(res => {
            res({
              BTCBUSD: 9
            })
          })}
      }})
    expect(await livePricesBinance()).toBe(9);
     });
 
test("Handles error when Binance request fails", async () => {
    const livePricesBinance = require('../lib/binance.js').livePricesBinance;
    
    // Mocking the entire node-binance-api module to simulate a failed request
    jest.mock('node-binance-api', () => {
      return class Binance {
        // Mocking the prices method to throw an error (e.g., simulate a network issue)
        async prices() {
          throw new Error("Failed to fetch prices");
          }
        };
      });

        expect (await livePricesBinance()).toBe("Failed to fetch prices");
      });

