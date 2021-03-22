const request = require('request')


const forecast = (latitude, longitude, callback) => {
  
const url = 'http://api.weatherstack.com/current?access_key=3276ad3a26c7d2d4f9c5b1bf719031cd&query=' + latitude + ',' + longitude + '&units=m'

request ({ url, json: true }, (error, { body })=> {
  
        if (error){
            callback("unable to connect to the weather services", undefined)
        } else if (body.error){
            callback("unable to find the location. try again another search", undefined)
        } else  {
            callback(undefined, "the Weather of " + body.location.name + " at " + body.location.localtime + " is " + body.current.weather_descriptions + ". It's currently " + body.current.temperature + " degree out and it feels like " + body.current.feelslike + " degree."
            )
        }
})

}

module.exports = forecast
