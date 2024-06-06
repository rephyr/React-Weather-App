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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="sidebar">
        <form onSubmit={handleButtonClick}>
        <div className="search-field">
          <TextField
            label="Enter city"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      </form>
      {weatherData && (
        <>
          <div className="weather-data">
            <h2 className="temperature">{Math.round(weatherData.main.temp)}°C</h2>          
          </div>
          <p className="date">
            {
              `${capitalizeFirstLetter(new Date(weatherData.dt * 1000).toLocaleDateString(navigator.language, 
              { weekday: 'long' }))} | ${new Date(weatherData.dt * 1000).toLocaleDateString(navigator.language, 
              { day: 'numeric', month: 'long', year: 'numeric' })
              .split(' ')
              .map(word => word.length > 1 ? capitalizeFirstLetter(word) : word)
              .join(' ')}` 
            }
          </p>
        </>
      )}
      <ExtraWeatherData extraWeatherData={extraWeatherData} chanceOfRain={extraWeatherData ? extraWeatherData.chanceOfRain : null} />
      </div>
  );
}

export default SideBar;