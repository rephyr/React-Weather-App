import React from 'react';
import './TopBox.css';

function TopBox({ weatherData }) {
  return (
    <div className="top-box">
      {weatherData && (
        <>
          <h3>Weather Forecast</h3>
          <h1>{weatherData.name}</h1>
          <h2>{weatherData.weather[0].main}</h2>
        </>
      )}
    </div>
  );
}

export default TopBox;