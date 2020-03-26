import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import theme from '../themes/theme';
import getCoordinates from '../services/get-coordinates';
import getWeather from '../services/get-weather';

import MainBoard from './main-board';
import Navbar from './navbar';

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: 1200,
    height: '95%',
    margin: '20px auto',
    boxShadow: theme.shadows[5],
  },
}));

const App = () => {
  const styles = useStyles();

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

      // getWeather(data.latitude, data.longitude, 'en').then((weather) => {
      //   // console.log('weather: ', weather.weather[0].);
      //   setCurrentTemp(weather.main.temp);
      //   setWeatherDesc(weather.weather[0].description);
      // });
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.container}>
        <Navbar />

        {placeInfo.latitude === 0 ? null : (
          <div>
            <span>{placeInfo.latitude}</span>
            <span>{placeInfo.longitude}</span>
            <p>{city}</p>
            <p>{country}</p>
            {currentTemp ? <p>{`${currentTemp} grad`}</p> : null}
            {weatherDesc ? <p>{weatherDesc}</p> : null}
          </div>
        )}
        <MainBoard />
      </div>
    </ThemeProvider>
  );
};

export default App;

// TODO env-cmd разобраться что за модуль
// TODO typescript in devDependencies
