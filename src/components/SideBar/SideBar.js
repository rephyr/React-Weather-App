import React from 'react';
import TextField from '@mui/material/TextField';
import ExtraWeatherData from './ExtraWeatherData';
import './SideBar.css';

function SideBar({ setCity, weatherData, extraWeatherData }) {
  const [inputValue, setInputValue] = React.useState('');

  const handleButtonClick = (event) => {
    event.preventDefault();
    setCity(inputValue);
  };

  return (
    <div className="sidebar">
      <form onSubmit={handleButtonClick}>
        <TextField
          label="Enter city"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Change City</button>
      </form>
      {weatherData && (
        <>
          <div className="city-name">
            <h1>{weatherData.name}</h1>
          </div>
          <div className="weather-data">
            <h2>{Math.round(weatherData.main.temp)} C</h2>
          </div>
        </>
      )}
      <ExtraWeatherData extraWeatherData={extraWeatherData} chanceOfRain={extraWeatherData ? extraWeatherData.chanceOfRain : null} />
      </div>
  );
}

export default SideBar;