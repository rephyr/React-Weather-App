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
          <div className="weather-data">
            <h2>{Math.round(weatherData.main.temp)} C</h2>
            <p className="date">{new Date(weatherData.dt * 1000).toLocaleDateString(navigator.language, 
              { weekday: 'long' })} | {new Date(weatherData.dt * 1000).toLocaleDateString(navigator.language, 
              { day: 'numeric', month: 'long', year: 'numeric' })}</p>          
          </div>
        </>
      )}
      <ExtraWeatherData extraWeatherData={extraWeatherData} chanceOfRain={extraWeatherData ? extraWeatherData.chanceOfRain : null} />
      </div>
  );
}

export default SideBar;