const request = require("request");
const darkSkyUrl = "https://api.darksky.net/forecast/";
const API_KEY = "70cbc7efce9b377577f27d7bc810f344";

var getWeatherInfo = (latitude, longitude) => {
  var geoLocation = latitude + "," + longitude;
  var completeWeatherUrl = darkSkyUrl + API_KEY + "/" + geoLocation;

  request(
    {
      url: completeWeatherUrl,
      json: true
    },
    (error, response, body) => {
      if (error) {
        console.log("Unable to connect to Forecast.io server");
      } else if (response.statusCode === 400) {
        console.log("Unable to fetch weather info");
      } else if (!error && response.statusCode === 200) {
        // Everything good at this point
        console.log("Current temperature:", body.currently.temperature);
      }
    }
  );
};

var getWeatherForecast = (latitude, longitude, callback) => {
  var geoLocation = latitude + "," + longitude;
  var completeWeatherUrl = darkSkyUrl + API_KEY + "/" + geoLocation;
  //console.log(completeWeatherUrl);

  request(
    {
      url: completeWeatherUrl,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback("Unable to connect to Forecast.io server");
      } else if (response.statusCode === 400) {
        callback("Unable to fetch weather info");
      } else if (!error && response.statusCode === 200) {
        // Everything good at this point
        callback(undefined, {
          summary: body.daily.data[0].summary,
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      }
    }
  );
};

module.exports = {
  getWeatherInfo,
  getWeatherForecast
};
