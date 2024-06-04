import React from 'react';
import './ExtraWeatherData.css';

function ExtraWeatherData({ extraWeatherData }) {
    return (
        extraWeatherData && extraWeatherData.main && (
        <div className="extraWeatherData">
            <p>Feels Like: {extraWeatherData.main.feels_like} C</p>
            <p>Humidity: {extraWeatherData.main.humidity}%</p>
            <p>Rain: {extraWeatherData.rain ? extraWeatherData.rain['1h'] : 'No rain'} mm</p>
            <p>Wind Speed: {extraWeatherData.wind.speed} m/s</p>
            <p>UV Index: {extraWeatherData.uvi}</p>
        </div>
        )
    );
}

export default ExtraWeatherData;