const request=require('request');
const forecast=(long,lat,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=aea82344b04c8b9c2656dfa5161cf782&query=${long},${lat}`;
    request({url,json:true},(error,{body})=>{
      if(error){
       callback(`unable to connect to the app`,undefined);
      }
      else if(body.error){
        callback(`unable to connect to the app`,url);
      }
      else{
       callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. There is a ${body.current.feelslike}% chance of rain`
        /*{
        weather_description:response.body.current.weather_descriptions[0],
        temperature:response.body.current.temperature,
        perception:response.body.current.feelslike }*/
        
      )
      }
    })
   }
module.exports=forecast;