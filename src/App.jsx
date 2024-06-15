import React from 'react';
import './App.css';
import RainChart from './components/24HRainForecast/RainChart';
import SideBar from './components/SideBar/SideBar';
import TopBox from './components/MainLayout/TopBox'; 
import SevenDayForecastChart from './components/SevenDayForecast/SevenDayForecastChart';
import TemperatureGraph from './components/24HForecast/TemperatureGraph';
import useWeatherData from './hooks/useWeatherData';
import getBackgroundImage from './getBackgroundImage';

function App() {
  const [city, setCity] = React.useState('London');
  const { weatherData, extraWeatherData, forecastData, sevenDayForecast, error } = useWeatherData(city);
  const [backgroundImageUrl, setBackgroundImage] = React.useState('');

  React.useEffect(() => {
    if (weatherData) {
      const imageUrl = getBackgroundImage(weatherData.weather[0].main);
      console.log('Image URL:', imageUrl);
      setBackgroundImage(imageUrl);
    }
  }, [weatherData]);
  
  return (
    <div className="App">
        <div key={backgroundImageUrl} className="background" style={{ backgroundImage: backgroundImageUrl }}></div>
      <SideBar className="sidebar" city={city} setCity={setCity} weatherData={weatherData} extraWeatherData={extraWeatherData} error={error} />   
      <div className="content">
        <div className="topbox">
          <TopBox weatherData={weatherData} /> 
        </div>
        <div className="chart-container">
          <div className="bottom-container">
            <div className="temperature-graph-container">
              <TemperatureGraph className="TemperatureGraph" forecastData={forecastData}/>   
            </div>
            <div className="rain-chart-container">
              <RainChart className="RainChart" forecastData={forecastData}/>  
            </div>
          </div>
          <div className="seven-day-chart">
            <SevenDayForecastChart sevenDayForecast={sevenDayForecast} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;