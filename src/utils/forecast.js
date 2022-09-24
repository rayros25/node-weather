const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + process.env.WS_KEY + '&query=' + lat + ',' + long + '&units=f'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather services.', undefined)
        }
        else if (body.error) {
            console.log(body.error)
            callback('Unable to retrieve data', undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] 
            + ': It is currently ' + body.current.temperature 
            + ' degrees. It feels like ' + body.current.feelslike + ' degrees.'
            + ' There is currently ' + body.current.cloudcover + '% cloud cover.')
        
        }
    })
}

module.exports = forecast