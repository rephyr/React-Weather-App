// useWeatherData.js
import { useState, useEffect } from 'react';
import { fetchWeatherData, fetchExtraWeatherData, fetch24hForecast } from '../api/weatherApi';

const useWeatherData = (city) => {
  const [weatherData, setWeatherData] = useState(null);
  const [extraWeatherData, setExtraWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeatherData(city)
      .then(data => {
        setWeatherData(data);

        const { lat, lon } = data.coord;
        fetchExtraWeatherData(lat, lon)
          .then(extraData => {
            setExtraWeatherData(extraData);

            fetch24hForecast(lat, lon)
              .then(forecastData => {
                setForecastData(forecastData);
              })
              .catch(err => {
                setError(`Error fetching 24-hour forecast data: ${err.message}`);
              });
          })
          .catch(err => {
            setError(`Error fetching extra weather data: ${err.message}`);
          });
      })
      .catch(err => {
        setError(`Error fetching weather data: ${err.message}`);
      });
  }, [city]);

  return { weatherData, extraWeatherData, forecastData, error };
};

export default useWeatherData;