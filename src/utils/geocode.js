const request = require('request');
const keyMap = 'pk.eyJ1Ijoib21lcmJrazA2IiwiYSI6ImNrNThqeGRxbDBlcDIzam11eDIzaDRsamYifQ.P8GSW1O3dRj59x7v9l7FqA';

const geocode = (adress, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?access_token=${keyMap}`;

    request( { url, json: true }, (error, response) => {
        if(error) {
            callback('Uanble to connect to the server!', undefined);
        }  else if ( response.body.features.length === 0) {
            callback('Unable to find the location. Please check the search terms.', undefined);
        }  else {
            callback(undefined, {
                longtitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            });
        }
    });

}

module.exports = geocode;