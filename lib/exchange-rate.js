async function moneyExchangeConverter(){
    var myHeaders = new Headers();
myHeaders.append("apikey",process.env.APP_KEY);

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};
try{
  const response = await fetch("https://api.apilayer.com/exchangerates_data/convert?to=MYR&from=USD&amount=1", requestOptions)
  
  if (!response.status === 200){
    throw new Error(`HTTP error! status${response.status}`);
  }
  const data = await response.json();

  return data.result;
}  catch (error) {
    console.error("An error occured:", error);
    return null;
  }
}
export {moneyExchangeConverter};