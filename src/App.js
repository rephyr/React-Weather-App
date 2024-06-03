import React, { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';

function App() {
  const [city, setCity] = useState('London');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(response => response.json())
      .then(data => setWeatherData(data));
  }, [city]);

  return (
    <div className="App">
      <header className="App-header">
        <SearchBar city={city} setCity={setCity} />
        {weatherData && (
          <div>
            <h1>{weatherData.name}</h1>
            <h2>{Math.round(weatherData.main.temp)} C</h2>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;