const request = require('request')

const forcast = (city,callback) => {
    const url = `https://api.api-ninjas.com/v1/weather?city=${city}`;
    request({
        url, // OBJECT SHORTHAND PROPERTT USED AS BOTH PROPERTY AND VARIABLE HAS SAME NAME URL
    // IF NAME IS DIFFERNT WE ARE NOT ABLE TO USE THE ABOVE SYNTAX
        headers: {
            'X-Api-Key': '1mGbCT5yTOgjFeTsrzEWNc5gpvVsONAdcV2c80vW'
        },
        json:true
    },(error,{body}) => {   // DESTRUCTURING THE RESPONSE OBJECT AND ONLY GETTING BODY PROPERTY FROM IT AS BODY VARIABLE.
        if(error){
            callback('Cannot connect to server',undefined);
        } else if(body.error){
            callback('Unable to find the location.Please try another.',undefined)
        }else{
            callback(undefined,`current temp is: ${body.temp} and its feels like: ${body.feels_like}`)
        }                                           // BODY VARIABLE IS USED HERE

    })
}

module.exports = forcast