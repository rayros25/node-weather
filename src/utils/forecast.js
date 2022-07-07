const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3f4211d083d747d948a4208e29fb4af2&query=' + lat + ',' + long + '&units=f'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather services.', undefined)
        }
        else if (body.error) {
            callback('Unable to retrieve data', undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] 
            + ': It is currently ' + body.current.temperature 
            + ' degrees. It feels like ' + body.current.feelslike + ' degrees.')
        }
    })
}

module.exports = forecast