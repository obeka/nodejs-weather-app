const request = require('request');
const keyWeather = 'ebe209f9b17c03e0040a634f0700340e';

const forecast = (lati, long, callback) => {
    const url = `https://api.darksky.net/forecast/${keyWeather}/${lati},${long}?units=si`;

    request( { url , json:true }, (error, response) => {
        if(error) {
            callback('Unable to connact to the weather service.', undefined);
        } else if (response.body.error) {
            callback('Unable to find the location. Please check the serach terms.', undefined);
        } else {
            callback(undefined, response.body)
        }
    });
}

module.exports = forecast;