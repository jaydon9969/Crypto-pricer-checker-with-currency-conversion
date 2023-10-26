async function livePricesLunoMyr(){
  try{
    const response = await fetch(`https://api.luno.com/api/1/ticker?pair=XBTMYR`);
    
    if (!response.status === 200){
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return +data.last_trade;
  } catch (error) {
    console.error("An error occured:", error);
    return "Failed to retrieve price";
  }
}  

  export {livePricesLunoMyr}