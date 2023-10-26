import Binance from "node-binance-api";

async function livePricesBinance(){
  const binance = new Binance();
  try {
    const ticker = await binance.prices();
    return ticker.BTCBUSD
  } catch (error) {
    console.error("Error fetching Binance prices:", error);
    return "Failed to fetch prices";
  }
}

  export {livePricesBinance};