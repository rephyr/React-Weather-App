import React from 'react';
import './App.css';
import SideBar from './components/SideBar/SideBar';
import TopBox from './components/MainLayout/TopBox'; 
import TemperatureGraph from './components/24HForecast/TemperatureGraph';
import useWeatherData from './hooks/useWeatherData';

function App() {
  const [city, setCity] = React.useState('London');
  const { weatherData, extraWeatherData, forecastData } = useWeatherData(city);

  return (
    <div className="App">
      <SideBar city={city} setCity={setCity} weatherData={weatherData} extraWeatherData={extraWeatherData} />
        <div className="content">
          <TopBox weatherData={weatherData} />
          <TemperatureGraph forecastData={forecastData} />
        </div>
    </div>
  );
}

export default App;