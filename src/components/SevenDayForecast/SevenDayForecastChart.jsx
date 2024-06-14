import React from "react";
import "./SevenDayForecastChart.css";

function SevenDayForecastChart({ sevenDayForecast }) {
  const getDayOfWeek = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  if (!sevenDayForecast) {
    return <div>Loading...</div>;
  }

  return (
    <div className="forecastContainer">
      <div className="title">7-day forecast</div>
      {sevenDayForecast.map((day, index) => (
        <div key={index} className="dayForecast">
          <div className="forecastContent">
            <span className="dayOfWeek">{getDayOfWeek(day.dt)}</span>
            <img 
              src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} 
              alt={day.weather[0].main} 
            />
            <span className="weatherMain">{day.weather[0].main}</span>
            <span className="temp">{Math.round(day.temp.min)}°C / {Math.round(day.temp.max)}°C</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SevenDayForecastChart;