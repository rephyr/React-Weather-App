const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

export const fetchWeatherData = (city) => {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => ({
      ...data,
      chanceOfRain: data.rain ? 100 : 0,
    }));
};

export const fetchExtraWeatherData = (lat, lon) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => ({
      ...data,
      chanceOfRain: data.rain ? 100 : 0,
    }));
};
