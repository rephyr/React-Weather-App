import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('London');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    console.log(apiKey)
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => setWeatherData(data));
  }, [city]);

  return (
    <div className="App">
      <div className="top-bar">
        <h1>Weather App</h1>
      </div>
      <header className="App-header">
        <input
          type="text"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Enter city"
        />
        {weatherData && (
          <div>
            <h1>{weatherData.name}</h1>
            <h2>{weatherData.main.temp}</h2>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;