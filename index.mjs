import * as dotenv from 'dotenv'
dotenv.config()

//Retrieve the BTCBMYR price on Luno
async function livePricesLunoMyr(){
  const response = await fetch("https://api.luno.com/api/1/ticker?pair=XBTMYR");
  const data = await response.json();
  return +data.last_trade;
}

const priceLunoBTCBMYR = await livePricesLunoMyr()
console.log("BTCMYR price on Luno: MYR",priceLunoBTCBMYR)

//Currency Exchange function
var myHeaders = new Headers();
myHeaders.append("apikey",process.env.APP_KEY);

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

async function moneyExchangeConverter(){
    const response = await fetch("https://api.apilayer.com/exchangerates_data/convert?to=MYR&from=USD&amount=1", requestOptions)
    const data = await response.json();
    return data.result;
}


const convertUsdToMyr = await moneyExchangeConverter();
console.log("USDMYR: ",convertUsdToMyr);

//converting BTCMYR TO BTCUSD
let pricesLunoBTCUSD2 = priceLunoBTCBMYR/convertUsdToMyr;
console.log("BTCUSD price on Luno: ",pricesLunoBTCUSD2)


//Retrieve the BTCUSD price on Luno
// async function livePricesLunoUsd(){
//   const response = await fetch("https://api.luno.com/api/1/ticker?pair=XBTUSDC");
//   const data = await response.json();
//   return data.last_trade;
// }

// const pricesLunoBTCUSD = await livePricesLunoUsd()
// console.log("BTCUSD price on Luno: USD",pricesLunoBTCUSD)

//Retrieve the BTCBUSD price on Binance
import Binance from "node-binance-api";
const binance = new Binance();

async function livePricesBinance(){
  let ticker = await binance.prices();
  return ticker.BTCBUSD;
}

const priceBinanceBTCBUSD = await livePricesBinance()
console.log("BTCBUSD price on Binance: ", priceBinanceBTCBUSD)

//Calculate the price difference
function differenceCalculator(){
  return Math.abs(pricesLunoBTCUSD2 - priceBinanceBTCBUSD);
}
const priceDifference = differenceCalculator();
console.log("Price difference: ", priceDifference);

//Calculate percentage difference between Luno and Binance
function calcPercentage(x, y, fixed = 2) {
  const percent = (x / y) * 100;

  if(!isNaN(percent)){
    return Number(percent.toFixed(fixed));
  }else{
  return null;
}}

console.log("Luno premium: ",100 - calcPercentage(priceBinanceBTCBUSD, pricesLunoBTCUSD2),"%");
