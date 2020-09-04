const axios = require('axios');
//function which gets the forecast
async function getForecast(forecastUrl) {
  //try and catch for getting forecast
  const response = await axios.get(forecastUrl);
  if(response.data.error){
    throw new Error(response.data.error);
  } else {
    return response.data;
  }
}

module.exports = getForecast;