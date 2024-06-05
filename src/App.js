import React from 'react';
import './App.css';
import SideBar from './components/SideBar/SideBar';
import TopBox from './components/MainLayout/TopBox'; 
import useWeatherData from './hooks/useWeatherData';

function App() {
  const [city, setCity] = React.useState('London');
  const { weatherData, extraWeatherData } = useWeatherData(city);

  return (
    <div className="App">
      <SideBar city={city} setCity={setCity} weatherData={weatherData} extraWeatherData={extraWeatherData} />
        <div className="content">
          <TopBox weatherData={weatherData} />
        </div>
    </div>
  );
}

export default App;