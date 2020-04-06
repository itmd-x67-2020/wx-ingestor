const AWApi = require('ambient-weather-api');

const apiKey = process.env.AMBIENT_WEATHER_USER_KEY;

const api = new AWApi({
  apiKey: apiKey,
  applicationKey: process.env.AMBIENT_WEATHER_APP_KEY
});

function shortDate(d) {
  d = new Date(d);
  return `${d.getMonth()+1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
}

function cardinalDirection(deg) {
  var cardinals = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
    'N'
  ];
  return cardinals[Math.round(deg / 22.5)];
}


api.connect();
api.on('connect', function() {
  console.log('Connected to the Ambient Weather API');
});

api.on('subscribed', function(ddata) {
  // console.log(data.devices[0].lastData);
  var data = ddata.devices[0].lastData;
  console.log(`At ${shortDate(data.date)} - ${data.tempf}℉, wind out of the ${cardinalDirection(data.winddir)} at ${data.windspeedmph} mph`);
})

api.on('data', function(data){
  console.log(`At ${shortDate(data.date)} - ${data.tempf}℉, wind out of the ${cardinalDirection(data.winddir)} at ${data.windspeedmph} mph`);
});

api.subscribe(apiKey);
