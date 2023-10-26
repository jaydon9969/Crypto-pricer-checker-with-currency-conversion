//imports
import * as dotenv from 'dotenv'
import { livePricesBinance } from './lib/binance.js'
import { livePricesLunoMyr } from './lib/luno.js'
import { moneyExchangeConverter } from './lib/exchange-rate.js'

dotenv.config()
export default async function calcPremium() {

// Retrieve the BTCBMYR price on Luno
const priceLunoBTCBMYR = await livePricesLunoMyr()
// console.log("BTCMYR price on Luno: MYR",priceLunoBTCBMYR)

//Currency Exchange function
const convertUsdToMyr = await moneyExchangeConverter();


//converting BTCMYR TO BTCUSD
let pricesLunoBTCUSD2 = priceLunoBTCBMYR/convertUsdToMyr;
// console.log("BTCUSD price on Luno: ",pricesLunoBTCUSD2)


//Retrieve the BTCBUSD price on Binance

const priceBinanceBTCBUSD = await livePricesBinance()
// console.log("BTCBUSD price on Binance: ", priceBinanceBTCBUSD)

//Calculate the price difference
function differenceCalculator(){
  return Math.abs(pricesLunoBTCUSD2 - priceBinanceBTCBUSD);
}
const priceDifference = differenceCalculator();
// console.log("Price difference: ", priceDifference);

//Calculate percentage difference between Luno and Binance
function calcPercentage(x, y) {
  const percent = (x / y) * 100;
  return percent
}

console.log("BTCMYR price on Luno: MYR",priceLunoBTCBMYR)
console.log("USDMYR: ",convertUsdToMyr);
console.log("BTCUSD price on Luno: ",pricesLunoBTCUSD2)
console.log("BTCBUSD price on Binance: ", priceBinanceBTCBUSD)
console.log("Price difference: ", priceDifference);
console.log("Luno premium: ",(100 - calcPercentage(priceBinanceBTCBUSD, pricesLunoBTCUSD2)).toFixed(4),"%");

};

calcPremium()




