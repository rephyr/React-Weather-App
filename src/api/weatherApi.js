const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

export const fetchWeatherData = (city) => {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error('City not found');
      }
      return response.json();
    })
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

      return forecast24h;
    });
};

export const fetchNextDaySunrise = (lat, lon) => {
  return new Promise((resolve, reject) => {
    const today = new Date();
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);

    const formattedDate = nextDay.toISOString().split('T')[0];
    const url = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lon}&date=${formattedDate}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK') {
          const sunriseLocal = data.results.sunrise;

          const dateTimeParts = sunriseLocal.split(' '); 
          const timeParts = dateTimeParts[0].split(':'); 
          let hours = parseInt(timeParts[0], 10);
          const minutes = timeParts[1];
          const seconds = timeParts[2];
          const amPm = dateTimeParts[1];
      
          if (amPm === 'PM' && hours < 12) {
              hours += 12;
          } else if (amPm === 'AM' && hours === 12) {
              hours = 0;
          }
      
          const hoursFormatted = hours.toString().padStart(2, '0');
      
          // Reconstruct the date-time string in 24-hour format
          const dateTimeString = `${formattedDate}T${hoursFormatted}:${minutes}:${seconds}`;
          console.log(dateTimeString);
          // Create the Date object
          const sunriseDate = new Date(dateTimeString);
            
          // Convert the Date object to a Unix timestamp
          const sunriseTimestamp = Math.floor(sunriseDate.getTime() / 1000);

          resolve(sunriseTimestamp);
        } else {
          reject('Failed to fetch next day\'s sunrise time');
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        reject('Error: ' + error);
      });
  });
};