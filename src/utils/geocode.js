const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmhpbG1hc3dhdGkiLCJhIjoiY2ttaG16NHl4MDhxeTJvbWc2bG4wM3U0MiJ9.nNvfZugTU6bqwkklvQwrEg&limit=1'
    
   // request({url : URL, json: true}, (error, response)=>{ //using obj shorthand
   request({url, json: true}, (error, {body})=>{
        if(error){
          callback('Unable to establish connection. Try after sometime', undefined)
        }else if(body.features.length ===0){
          callback('Unable to find/fetch location', undefined)
        }else{
          callback(undefined, {
            latitude : body.features[0].center[1],
            longitude : body.features[0].center[0],
            place : body.features[0].place_name
  
          })
        }
    })
  
  }

  module.exports = geocode



