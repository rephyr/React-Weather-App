import React from 'react';
import ExtraWeatherData from './ExtraWeatherData';
import TimeGraph from './TimeGraph';
import SearchIcon from '@mui/icons-material/Search';
import useNextDaySunrise from '../../hooks/useNextDaySunrise';
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

  const { sunrise: nextDaySunrise } = useNextDaySunrise(weatherData?.coord?.lat, weatherData?.coord?.lon);
  
  return (
    <div className="sidebar">
      <form onSubmit={handleButtonClick}>
        <div className="search-field">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              backgroundColor: 'white',
              borderRadius: '5px',
              height: '20px',
              border: 'none',
              paddingLeft: '35px',
              color: '#969696', 
              fontFamily: 'Arial'
            }}
          />
          <SearchIcon style={{ position: 'absolute', left: '55px', top: '20px', fontSize: '20px', color: '#969696' }} />      
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
              { day: 'numeric', month: 'short', year: 'numeric' })
              .split(' ')
              .map(word => word.length > 1 ? capitalizeFirstLetter(word) : word)
              .join(' ')}` 
            }
          </p>
        </>
      )}
      <ExtraWeatherData extraWeatherData={extraWeatherData} chanceOfRain={extraWeatherData ? extraWeatherData.chanceOfRain : null} />
      {weatherData && weatherData.sys && weatherData.sys.sunrise && weatherData.sys.sunset && nextDaySunrise ? (
        <TimeGraph
          sunrise={weatherData.sys.sunrise}
          sunset={weatherData.sys.sunset}
          nextDaySunrise={nextDaySunrise}
        />) : null}
    </div>
  );
}

export default SideBar;