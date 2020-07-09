const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=128f0fc8b34f2390588e7a50f0343dc4&query='+ latitude + ',' + longitude +'&units=m'
    request({url, json: true}, (error, { body }) =>{
        if(error){
            callback('Unable to connect to weather services!', undefined)
        }else if (body.error){
            callback('Unable to find location! ', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + ' percent.') 
        }
    })
}

module.exports = forecast

// const url = 'http://api.weatherstack.com/current?access_key=128f0fc8b34f2390588e7a50f0343dc4&query=37.8267,-122.4233&units=m'

//  request({url:url, json:true}, (error, response) =>{   if(error){
//      console.log('Unable to connect to weather services!')
//    }else if(response.body.error){
//      console.log('Unable to find location! ')
//    }else{
//      console.log(response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out. ') 
//    }
//  })