const weatherData = {
  monday: {
    humidity: '34%',
    pollenLevel: '0',
    temperatureCelsius: '23'
  }
}

module.exports = {
  async getForecast(day) {
    // Fetch from some API
    // return await(await fetch(`//example.com/weather?day=${day}`)).json();
    return weatherData;
  },
  fahrenheitToCelsius(f) { return ((f - 32) * 5) / 9; },
  celsiusToFahrenheit(c) { return (c * 9) / 5 + 32; },
}