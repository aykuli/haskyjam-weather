import React, { useState, useEffect } from 'react';

import getCoordinates from './services/get-coordinates';
import getWeather from './services/get-weather';

import MainBoard from './components/main-board';

function App() {
  const [placeInfo, setPlaceInfo] = useState({ latitude: 0, longitude: 0 });
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [currentTemp, setCurrentTemp] = useState(null);
  const [weatherDesc, setWeatherDesc] = useState('null');

  useEffect(() => {
    getCoordinates().then((data) => {
      setPlaceInfo(data);
      setCity(data.city);
      setCountry(data.country);

      getWeather(data.latitude, data.longitude, 'en').then((weather) => {
        // console.log('weather: ', weather.weather[0].);
        setCurrentTemp(weather.main.temp);
        setWeatherDesc(weather.weather[0].description);
      });
    });
  }, []);

  return (
    <div>
      <header>Hello</header>
      {placeInfo.latitude === 0 ? null : (
        <div>
          <span>{placeInfo.latitude}</span>
          <span>{placeInfo.longitude}</span>
          <p>{city}</p>
          <p>{country}</p>
          {currentTemp ? <p>{currentTemp} grad</p> : null}
          {weatherDesc ? <p>{weatherDesc}</p> : null}
        </div>
      )}
      <MainBoard />
    </div>
  );
}

// TODO env-cmd разобраться что за модуль
// TODO typescript in devDependencies

export default App;
