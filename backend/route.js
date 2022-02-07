const express=require('express')
const router=express.Router()
const axios=require("axios")




  
router.get('/getForecast', async(req, res,next) => {
  
    var params = {location:req.query.data , fields: ["temperature","temperatureApparent","temperatureMin","temperatureMax","windSpeed","windDirection","humidity","pressureSeaLevel","uvIndex","weatherCode","precipitationProbability","precipitationType","sunriseTime","sunsetTime","visibility","moonPhase","cloudCover"],timesteps: ["1h","1d"], units: "imperial", apikey: "8mYAUBrDZRI6pyhZYQ08vg5GD1RRdrCs"}
    await axios.get(`https://api.tomorrow.io/v4/timelines`,{params}).then(resp => {
      console.log(resp)
      res.setHeader('Access-Control-Allow-Origin', '*').status(200).send(resp.data).end();
    }).catch(error=>{
      res.send(resp)
  });
  });
  
  router.get('/getCoordinates', async(req, res,next) => {
  
    await axios.get('https://ipinfo.io/?token=9d3e16965e4377').then(resp => {
      res.setHeader('Access-Control-Allow-Origin', '*').status(200).send(resp.data).end();
    }).catch(error=>{
  });
  });
  router.get('/autocompletes', async(req, res,next) => {
    console.log(req.query.data)
    console.log(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.query.data}&types=(cities)&key=AIzaSyDBqjDd_FoAcv4p5P8eZeGWwAO2JnYTWPw`)
    await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.query.data}&types=(cities)&key=AIzaSyDBqjDd_FoAcv4p5P8eZeGWwAO2JnYTWPw`).then(resp => {
      console.log(resp.data.predictions)
      const val=[]
      for(i=0;i<resp.data.predictions.length;i++){
        val.push(resp.data.predictions[i].description)
      }
      res.setHeader('Access-Control-Allow-Origin', '*',).status(200).send(val).end()
    }).catch(error=>{
  });
  });
  router.get('/autocomplete', async(req, res,next) => {
    console.log(req.query.data)
    console.log(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.query.data}&types=(cities)&key=AIzaSyDBqjDd_FoAcv4p5P8eZeGWwAO2JnYTWPw`)
    await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.query.data}&types=(cities)&key=AIzaSyDBqjDd_FoAcv4p5P8eZeGWwAO2JnYTWPw`).then(resp => {
      console.log(resp.data.predictions)
      res.setHeader('Access-Control-Allow-Origin', '*',).status(200).send(resp.data).end()
    }).catch(error=>{
  });
  });
  
  router.get('/getCoordinate', async(req, res,next) => {
    console.log('get call')
    console.log(req.query.address)
       await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.address}&key=AIzaSyBdfiZJVG5ZPNtr4_61AesohqpmZyN-Lmc`).then(resp => {
      console.log(resp.data);
      let loc=resp.data.results[0].geometry.location
      let data = `${loc.lat},${loc.lng}`
      res.setHeader('Access-Control-Allow-Origin', '*').status(200).send({lat:loc.lat,lon:loc.lng}).end();
    }).catch(error=>{
      console.log
  });
  });
  
  router.get('/getCharts',async (req, res,next) => {
    console.log('getCharts')
    var params = {location:req.query.data , fields: ["temperature","temperatureApparent","temperatureMin","temperatureMax","windSpeed","windDirection","humidity","pressureSeaLevel","uvIndex","weatherCode","precipitationProbability","precipitationType","sunriseTime","sunsetTime","visibility","moonPhase","cloudCover"],timesteps: ["1h","1d"], units: "imperial", apikey: "slzJ4vYRd8fUKIFdLexaBhKiRn5c8I9a"}
    await axios.get(`https://api.tomorrow.io/v4/timelines`,{params}).then(resp => {
    console.log('getChart')
      console.log(JSON.stringify(resp.data));
      var response = resp.data
      var res2 = response.data.timelines[0].intervals
      console.log(res2)
      var  resp1=[]
       for(var i=0;i<res2.length;i++){
                      resp1.push({
                          time: res2[i].startTime, 
                          temperature: res2[i].values.temperature,
                          windSpeed: res2[i].values.windSpeed,
                          windDirection: res2[i].values.windDirection,
                          humidity: res2[i].values.humidity,
                          pressureSeaLevel: res2[i].values.pressureSeaLevel,
                          cloudCover: res2[i].values.cloudCover,
                          precipitationProbability: res2[i].values.precipitationProbability
                      })                
                    }
      res.setHeader('Access-Control-Allow-Origin', '*').status(200).send(resp1).end();
    }).catch(error=>{
      console.log
  });
  });
  module.exports=router