import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import theme from '../themes/theme';
import getCoordinates from '../services/get-coordinates';
import getWeather from '../services/get-weather';

import Navbar from './navbar';
import CurrentWeather from './current-weather';
import SavedCities from './saved-cities';
import Week from './week';

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: 1200,
    height: '95%',
    margin: '20px auto',
    boxShadow: theme.shadows[5],
  },
  sceleton: {
    margin: 'auto',
  }
}));

const App = () => {
  const styles = useStyles();

  const [placeInfo, setPlaceInfo] = useState({ latitude: 0, longitude: 0 });
  const [city, setCity] = useState('Moscow');
  const [countryCode, setCountryCode] = useState('GB');
  const [currentTemperature, setCurrentTemperature] = useState(15);
  const [weatherDescription, setWeatherDescription] = useState('null');

  useEffect(() => {
    getCoordinates().then((data) => {
      setPlaceInfo(data);
      setCity(data.city);
      setCountryCode(data.country);
      console.log('data: ', data);
      getWeather(data.latitude, data.longitude, 'en')
        .then((weather) => {
          console.log('weather: ', weather);
          setCurrentTemperature(weather.currently.temperature);
          const txt = `${weather.currently.summary}, Wind - ${weather.currently.windSpeed} m/s`
          setWeatherDescription(txt);
        })
        .catch((e) => {
          console.log('e: ', e);
        });
    });
  }, []);
  const citiesList = ['city0', 'city1', 'city2', 'city3', 'city4', 'city5', 'city6', 'city7'];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.container}>
        <Navbar />
        {placeInfo.latitude !== 0 ? (
          <CurrentWeather
            temperature={currentTemperature}
            city={city}
            countryCode={countryCode}
            isMainPage
            weatherInfo={weatherDescription}
          />
        ) : (
          <div className={styles.sceleton}>
            <Skeleton variant="text" />
            <Skeleton variant="rect" width={210} height={118} />
          </div>
        )}
        <SavedCities citiesList={citiesList} />
        <Week />
      </div>
    </ThemeProvider>
  );
};

export default App;

// TODO env-cmd разобраться что за модуль
// TODO typescript in devDependencies
