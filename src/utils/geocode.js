const request = require('request')

const geocode = (address, callback) => {
  
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZmh0ODAxIiwiYSI6ImNrbWQ4b25pZjA1a2gybm56bm1wdDZpMGYifQ._ggWIh-LCDhv9GOf9bp_vA&limit=1'
    
    request ({ url, json: true }, (error, { body })=> {
      
            if (error){
                callback("unable to connect to the weather services", undefined)
            } else if (body.features.length === 0){
                callback("unable to find the location. try again another search.", undefined)
            } else  {
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }
        })
    }
    
    module.exports = geocode

