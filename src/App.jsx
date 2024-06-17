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
  const [backgroundLayerOneUrl, setBackgroundLayerOneUrl] = React.useState('');
  const [backgroundLayerTwoUrl, setBackgroundLayerTwoUrl] = React.useState('');
  const [activeLayer, setActiveLayer] = React.useState(1); 

  // Background transition
  React.useEffect(() => {
    if (weatherData && weatherData.weather && weatherData.weather[0] && weatherData.weather[0].main) {
      const newBackgroundImageUrl = getBackgroundImage(weatherData.weather[0].main);
      // Change background if new url is different from the current one
      if ((activeLayer === 1 && newBackgroundImageUrl !== backgroundLayerOneUrl) || 
          (activeLayer === 2 && newBackgroundImageUrl !== backgroundLayerTwoUrl)) {
        const img = new Image();
        img.onload = () => {
          // Determine which layer to update based on the active layer
          if (activeLayer === 1) {
            setBackgroundLayerTwoUrl(newBackgroundImageUrl);
            setActiveLayer(2); 
          } else {
            setBackgroundLayerOneUrl(newBackgroundImageUrl);
            setActiveLayer(1); 
          }
        };
        img.src = newBackgroundImageUrl;
      }
    }
  }, [weatherData, activeLayer, backgroundLayerOneUrl, backgroundLayerTwoUrl]);

  return (
    <div className="App">
      <div
        className={`background background-layer-one ${activeLayer === 1 ? 'visible' : ''}`}
        style={{ backgroundImage: `url(${backgroundLayerOneUrl})` }}
      ></div>
      <div
        className={`background background-layer-two ${activeLayer === 2 ? 'visible' : ''}`}
        style={{ backgroundImage: `url(${backgroundLayerTwoUrl})` }}
      ></div>
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