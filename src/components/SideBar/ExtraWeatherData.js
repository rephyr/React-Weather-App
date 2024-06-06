import React from 'react';
import './ExtraWeatherData.css';
import { WiThermometer, WiHumidity, WiRain, WiStrongWind,} from "weather-icons-react";

function ExtraWeatherData({ extraWeatherData}) {
    return (
        extraWeatherData && extraWeatherData.main && (
            <div className="extraWeatherData">
                <div className="weatherItem">
                    <WiThermometer size={30} color="#fff" />
                    <div>
                        <p>Feels Like</p>
                        <p>{Math.round(extraWeatherData.main.feels_like)} C</p>
                    </div>
                </div>
                <div className="weatherItem">
                    <WiHumidity size={30} color="#fff" />
                    <div>
                        <p>Humidity</p>
                        <p>{extraWeatherData.main.humidity}%</p>
                    </div>
                </div>
                <div className="weatherItem">
                    <WiRain size={30} color="#fff" />
                    <div>
                        <p>Rain</p>
                        <p>{extraWeatherData.rain ? extraWeatherData.rain['1h'] : 'No rain'} mm</p>
                    </div>
                </div>
                <div className="weatherItem">
                    <WiStrongWind size={30} color="#fff" />
                    <div>
                        <p>Wind</p>
                        <p>{Math.round(extraWeatherData.wind.speed)} m/s</p>
                    </div>
                </div>
            </div>
        )
    );
}

export default ExtraWeatherData;