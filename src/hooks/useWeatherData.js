import { useState, useEffect } from 'react';
import { fetchWeatherData, fetchExtraWeatherData, fetch24hForecast, fetch7DayForecast } from '../api/weatherApi';

const useWeatherData = (city) => {
  const [weatherData, setWeatherData] = useState(null);
  const [extraWeatherData, setExtraWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [sevenDayForecast, setSevenDayForecast] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await fetchWeatherData(city);
        if (!isMounted) return;
        setWeatherData(data);

        const { lat, lon } = data.coord;
        const extraData = await fetchExtraWeatherData(lat, lon);
        if (!isMounted) return;
        setExtraWeatherData(extraData);

        const forecastData = await fetch24hForecast(lat, lon);
        if (!isMounted) return;
        setForecastData(forecastData);

        const fiveDayData = await fetch7DayForecast(lat, lon);
        if (!isMounted) return;
        setSevenDayForecast(fiveDayData);
      } catch (err) {
        if (!isMounted) return;
        if (err.message.includes('city not found')) {
          setError('City not found. Please try again.');
        } else {
          setError(`Error fetching data: ${err.message}`);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [city]);

  return { weatherData, extraWeatherData, forecastData, sevenDayForecast, error };
};

export default useWeatherData;