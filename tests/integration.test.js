
beforeEach(() => {
    jest.resetModules(); //reset module mocks before each test
  });
  
  
  test("Displays premium in console if all good", async () => {
    const calcPremium = require("../index.js").default;
  
    //Mock Luno Function
    const MOCK_LUNO_PRICE = 91000;
    jest.mock("../lib/luno.js", () => {
      return {
        livePricesLunoMyr() {
          return new Promise((res) => {
            res(MOCK_LUNO_PRICE);
          });
        },
      };
    });
  
    //Mock Exchange Rate Function
    const MOCK_EXCHANGE_RATE = 5;
    jest.mock("../lib/exchange-rate.js", () => {
        return {
            moneyExchangeConverter() {
              return new Promise((res) => {
                res(MOCK_EXCHANGE_RATE);
              });
            },
          };
        });
      
    //Mock Binance Function
    const MOCK_BINANCE_PRICE = 5;
    jest.mock("../lib/exchange-rate.js", () => {
        return {
            livePricesBinance() {
              return new Promise((res) => {
                res(MOCK_EXCHANGE_RATE);
              });
            },
          };
        });
    
    
    //Mock the console and call the function
    console.log = jest.fn(() => undefined); 
    await calcPremium();
  
    //check that the printed results matches, for example: 
    expect(console.log).toHaveBeenCalledWith("BTCMYR price on Luno: MYR",MOCK_LUNO_PRICE);
    expect(console.log).toHaveBeenCalledWith("USDMYR: ",convertUsdToMyr);
    expect(console.log).toHaveBeenCalledWith("BTCUSD price on Luno: ",pricesLunoBTCUSD2)
    expect(console.log).toHaveBeenCalledWith("BTCBUSD price on Binance: ", priceBinanceBTCBUSD)
    expect(console.log).toHaveBeenCalledWith("Price difference: ", priceDifference);
    });

