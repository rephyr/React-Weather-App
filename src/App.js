import React from 'react';
import './App.css';
import SideBar from './components/SideBar/SideBar';
import useWeatherData from './hooks/useWeatherData';

function App() {
  const [city, setCity] = React.useState('London');
  const { weatherData, extraWeatherData } = useWeatherData(city);

  return (
    <div className="App">
      <header className="App-header">
        <SideBar city={city} setCity={setCity} weatherData={weatherData} extraWeatherData={extraWeatherData} />
      </header>
    </div>
  );
}

export default App;