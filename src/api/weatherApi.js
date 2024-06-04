const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

export const fetchWeatherData = (city) => {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json());
};

export const fetchExtraWeatherData = (lat, lon) => {
  return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}`)
    .then(response => response.json());
};