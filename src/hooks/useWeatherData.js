import { useState, useEffect } from 'react';
import { fetchWeatherData, fetchExtraWeatherData } from '../api/weatherApi';

const useWeatherData = (city) => {
  const [weatherData, setWeatherData] = useState(null);
  const [extraWeatherData, setExtraWeatherData] = useState(null);
  const [error, setError] = useState(null);

  console.log('useWeatherData called with city:', city);

  useEffect(() => {
    console.log('useEffect running with city:', city);
    fetchWeatherData(city)
      .then(data => {
        console.log('fetchWeatherData resolved with data:', data);
        setWeatherData(data);

        // Fetch more weather data using latitude and longitude
        const { lat, lon } = data.coord;
        fetchExtraWeatherData(lat, lon)
          .then(extraData => {
            console.log('fetchExtraWeatherData resolved with extraData:', extraData);
            setExtraWeatherData(extraData);
            console.log('Extra Weather Data:', extraData);
          })
          .catch(err => {
            console.error('Error fetching extra weather data:', err);
            setError(`Error fetching extra weather data: ${err.message}`);
          });
      })
      .catch(err => {
        console.error('Error fetching weather data:', err);
        setError(`Error fetching weather data: ${err.message}`);
      });
  }, [city]);

  return { weatherData, extraWeatherData, error };
};

export default useWeatherData;