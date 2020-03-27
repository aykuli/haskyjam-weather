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
import { CITIES_LIST } from '../constantas/common';

const useStyles = makeStyles(() => ({
  container: {
    position: 'relative',
    maxWidth: 1200,
    height: '95%',
    margin: '20px auto',
    boxShadow: theme.shadows[5],
  },
  sceleton: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  addBtn: {
    position: 'absolute',
    top: 70,
    right: 10,
  },
}));

const App = () => {
  const styles = useStyles();

  const [city, setCity] = useState('Moscow');
  const [countryCode, setCountryCode] = useState('RU');
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [weatherDescription, setWeatherDescription] = useState('');
  const dataFromLocalStorage = localStorage.getItem(CITIES_LIST);
  const citiesList = dataFromLocalStorage === null ? [] : JSON.parse(dataFromLocalStorage);
  console.log('citiesList: ', citiesList);

  useEffect(() => {
    getCoordinates().then((data) => {
      setCity(data.city);
      setCountryCode(data.country);
      console.log('data: ', data);
      getWeather(data.latitude, data.longitude, 'en')
        .then((weather) => {
          console.log('weather: ', weather);
          setCurrentTemperature(weather.currently.temperature);
          const txt = `${weather.currently.summary}, Wind - ${weather.currently.windSpeed} m/s`;
          setWeatherDescription(txt);
        })
        .catch((e) => {
          console.log('e: ', e);
        });
    });
  }, []);

  const handleAddCity = (): void => {
    console.log('1) citiesList: ', citiesList);
    citiesList.push(city);
    console.log('2) citiesList: ', citiesList);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.container}>
        <Navbar />
        {currentTemperature === null ? (
          <div className={styles.sceleton}>
            <Skeleton variant="circle" width={50} height={50} className={styles.addBtn} />
            <Skeleton variant="text" width={50} height={70} />
            <Skeleton variant="text" width={300} height={50} />
            <Skeleton variant="rect" width={300} height={118} />
          </div>
        ) : (
          <CurrentWeather
            temperature={currentTemperature}
            city={city}
            countryCode={countryCode}
            isMainPage
            weatherInfo={weatherDescription}
            handleAddCity={handleAddCity}
          />
        )}
        {/* <SavedCities citiesList={citiesList} /> */}
        <Week />
      </div>
    </ThemeProvider>
  );
};

export default App;

// TODO env-cmd разобраться что за модуль
// TODO typescript in devDependencies
