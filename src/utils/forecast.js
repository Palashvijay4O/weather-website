const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7fde630225b1982eb7d9945ca7e23385&query=' + latitude + ',' + longitude
    
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback("Cannot connect to weather app", undefined)
        } else if(body.error) {
            callback("Unable to find location", undefined)
        } else {
            callback(error, {
                description: body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast