const request = require('postman-request')

const forecast = (lat,long, callback) => {
        
    const url = 'http://api.weatherstack.com/current?access_key=57c5eec67751d7b7a2fb7fee01237b7f&query=' + lat + ',' + long

    request({url, json: true}, (error, {body}) => {
        if(error){
                callback("Unable to process your request right now. Server error", undefined)
        }else if(body.error){
                callback("Unable to find location.", undefined)
        }else{
                // const data = response.body.current
                callback(undefined, "It is currently "+ body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out.")
            //   callback(undefined, response.body.current)
            }
    })
}

module.exports = forecast