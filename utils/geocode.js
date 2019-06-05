const request = require('request')

const geocode = (address, callback) => {
    var geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYnZlcnJpZXIiLCJhIjoiY2p3Z2poZmxqMTk1eTQzb3htNXIwZHUwayJ9.WN1VIUCfPJDvrMfKsTWQ-g&limit=1'
    request({url: geourl, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to geocode services', undefined)
        }else if(!response.body.features[0]){
            callback('Unable to find location. Try a different search', undefined)
        } else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode