const request = require('request')

const precip = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/bb5a32cfd8c84b6d08f45eb41ac781e0/' + latitude + ',' + longitude
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to weather service')
        }else if(response.body.error){
            callback('Unable to find location. Try a different search')
        } else{
            callback(undefined, 'There is a ' + response.body.currently.precipProbability + '% chance of precipitation')
        }
    })
}

module.exports = precip