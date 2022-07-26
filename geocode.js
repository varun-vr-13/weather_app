const request=require('request');
const geocode=(add,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+add+'.json?access_token=pk.eyJ1Ijoicm9oaXQ1NDMiLCJhIjoiY2w1cGlpaW15MGJ2ZzNqbXZ3aDE2bWNmcyJ9.IkJPN2ITobe4FkGPTimVXQ';

    request({url,json:true},(error,{body})=>{
  
      if(error){
       callback(`unable to connect to the app`,undefined);
      }
      else if(body.features.length===0){
        callback(`unable to connect to the app`,undefined);
      }
      else{
       callback(undefined,{
        latitude:body.features[0].center[0],
        longitude:body.features[0].center[1],
        location:body.features[0].place_name
      })
      }
    })
   }
   console.log('');
module.exports=geocode;