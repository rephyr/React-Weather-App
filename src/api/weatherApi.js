const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

export const fetchWeatherData = (city) => {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => data);
};

export const fetchExtraWeatherData = (lat, lon) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => data);
};

export const fetch24hForecast = (lat, lon) => {
  // Get the user's current time zone
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log('User time zone:', timeZone); 

  return fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&cnt=24`)
    .then(response => response.json())
    .then(data => {
      console.log('API response:', data);

      if (!data.list) {
        console.error('Error: API response does not include a "list" property');
        return [];
      }

      // Convert the dt_txt field to the user's local time
      const forecast24h = data.list.map(item => {
        const dtWithOffset = item.dt_txt + '+00:00';
        const localTime = new Date(dtWithOffset).toLocaleString('en-US', { timeZone: timeZone });

        return {
          ...item,
          dt_txt: localTime
        };
      });
      console.log('24-hour forecast:', forecast24h);

      return forecast24h;
    });
};