import React, { useState, useEffect } from 'react';

import getCoordinates from './services/get-coordinates';
import getWeather from './services/get-weather';

import MainBoard from './components/main-board';

function App() {
  const [placeInfo, setPlaceInfo] = useState({ latitude: 0, longitude: 0 });
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    getCoordinates().then((data) => {
      setPlaceInfo(data);
      setCity(data.city);
      setCountry(data.country);
      getWeather(data.latitude, data.longitude, 'en');
    });
  }, []);

  return (
    <div>
      <header>Hello</header>
      {placeInfo.latitude === 0 ? null : (
        <div>
          <span>{placeInfo.latitude}</span>
          <span>{placeInfo.longitude}</span>
          <span>{city}</span>
          <span>{country}</span>
        </div>
      )}
      <MainBoard />
    </div>
  );
}

// TODO env-cmd разобраться что за модуль
// TODO typescript in devDependencies

export default App;
