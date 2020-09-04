const axios = require('axios');
const getForecast = require('./forecast.js');

const geoCodingURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
const url = "http://api.weatherstack.com/forecast?access_key=3d76e9b866c47335e15cdf669b717f90"

//function which gets the location based on address.
async function geoCoding(address) {
    var urlForCoordinates = geoCodingURL + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibWVnaDIwMDQiLCJhIjoiY2pkM3lxb3JtMm1rMjJ3bXd0ZXltYTJ1cSJ9.GCje5V9YmVjaAvWyW3UbbA";
    const response = await axios.get(urlForCoordinates);
    if(response.data.features.length === 0){
        throw new Error('Unable to find location. Try another search.');
    } 
    else {
        const latitude = response.data.features[0].center[1]
        const longitude = response.data.features[0].center[0];
        var forecastUrl = url + "&query=" + latitude + ',' + longitude;
        var weather = getForecast(forecastUrl);
        return weather;
    }
}

module.exports = geoCoding;