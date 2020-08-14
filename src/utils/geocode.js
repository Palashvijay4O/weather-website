const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicGFsYXNodmlqYXk0byIsImEiOiJja2RwcDBjYWEwd2g5MnJ0YWV4YmE5dm1jIn0.mYCyD6zT2CGWC39XZijGXA'
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Cannot connect to the weather app', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find the location', undefined)
        } else {
            const latitude = body["features"][0]["center"][1]
            const longitude = body["features"][0]["center"][0]
            const data = {
                latitude : latitude,
                longitude : longitude,
                location : body["features"][0]["place_name"]
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode