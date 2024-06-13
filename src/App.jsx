import React from 'react';
import './App.css';
import RainChart from './components/24HRainForecast/RainChart';
import SideBar from './components/SideBar/SideBar';
import TopBox from './components/MainLayout/TopBox'; 
import TemperatureGraph from './components/24HForecast/TemperatureGraph';
import useWeatherData from './hooks/useWeatherData';

function App() {
  const [city, setCity] = React.useState('London');
  const { weatherData, extraWeatherData, forecastData, error } = useWeatherData(city);

  return (
    <div className="App">
      <div className="background"></div>
      <SideBar className="sidebar" city={city} setCity={setCity} weatherData={weatherData} extraWeatherData={extraWeatherData} error={error} />
        <div className="content">
          <div className="topbox">
            <TopBox weatherData={weatherData} />
          </div>
          <div className="bottom-container">
            <div className="temperature-graph-container">
              <TemperatureGraph className="TemperatureGraph" forecastData={forecastData}/>     
            </div>
            <div className="rain-chart-container">
              <RainChart className="RainChart" forecastData={forecastData}/>     
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;