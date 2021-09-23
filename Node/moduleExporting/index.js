const forecastHelpers = require('./forecastHelpers.js');
const {getForecast, celsiusToFahrenheit} = require('./forecastHelpers.js');

const chalk = require('chalk');

(async() => {
  let forecast = await forecastHelpers.getForecast();
  let {humidity, pollenLevel, temperatureCelsius} = forecast.monday;
  
  console.log(chalk`
    Humidity: {yellow ${humidity}}
    Pollen: {green ${pollenLevel}}
    Temp Celsius: {green ${temperatureCelsius}}
    Temp Fahrenheit: {green ${celsiusToFahrenheit(temperatureCelsius)}}
  `)
})()