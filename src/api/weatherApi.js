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

export const fetch7DayForecast = (lat, lon) => {
  return fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=8&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(({list}) => {
      const [, ...sevenDaysAhead] = list; 
      return sevenDaysAhead; 
    });
}

export const fetchExtraWeatherData = (lat, lon) => {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)    
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log("Extra data ", data);
      return data;
    });
};

export const fetch24hForecast = (lat, lon) => {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const timeZoneOffsetInSeconds = data.timezone;

      return fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&cnt=24`)
        .then(response => response.json())
        .then(forecastData => {
          if (!forecastData.list) {
            return [];
          }
          const forecast24h = forecastData.list.map(item => {
            const utcDate = new Date(item.dt_txt + 'Z');
            const localDate = new Date(utcDate.getTime() + timeZoneOffsetInSeconds * 1000);

            return {
              ...item,
              dt_txt: localDate.toISOString().replace('Z', '')
            };
          });
          return forecast24h;
        });
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

          /// Reconstruct the date-time string in 24-hour format, assuming the time is in UTC
          const dateTimeStringWithTimeZone = `${formattedDate}T${hoursFormatted}:${minutes}:${seconds}Z`;

          // Create the Date object
          const sunriseDate = new Date(dateTimeStringWithTimeZone);

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