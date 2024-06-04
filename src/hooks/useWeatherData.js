import { useState, useEffect } from 'react';
import { fetchWeatherData, fetchExtraWeatherData } from '../api/weatherApi';

const useWeatherData = (city) => {
  const [weatherData, setWeatherData] = useState(null);
  const [extraWeatherData, setExtraWeatherData] = useState(null);

  useEffect(() => {
    fetchWeatherData(city)
      .then(data => {
        setWeatherData(data);

        // Fetch more weather data using latitude and longitude
        const { lat, lon } = data.coord;
        fetchExtraWeatherData(lat, lon)
          .then(extraData => setExtraWeatherData(extraData));
      });
  }, [city]);

  return { weatherData, extraWeatherData };
};

export default useWeatherData;