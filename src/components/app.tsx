import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import Fakerator from 'fakerator';

import theme from '../themes/theme';
import getCoordinates from '../services/get-coordinates';
import getWeather from '../services/get-weather';
import getRandomColor from '../services/color-generator';

import Navbar from './navbar';
import CurrentWeather from './current-weather';
import SavedCities from './saved-cities';
import Week from './week';
import DayWeather from './day-weather';

import { CITIES_LIST } from '../constantas/common';
import FAKE_HISTORY from '../services/fake-history';

interface Coordinates {
  latitude: number;
  longitude: number;
}

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
  const fakerator = Fakerator('en-EN');

  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [city, setCity] = useState<string>('Moscow');
  const [countryCode, setCountryCode] = useState<string>('RU');
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [weatherDescription, setWeatherDescription] = useState<string>('');
  const [weather48Hours, setWeather48Hours] = useState(null);
  const [weatherWeek, setWeatherWeek] = useState(null);

  const dataFromLocalStorage = localStorage.getItem(CITIES_LIST);
  const list = dataFromLocalStorage === null ? [] : JSON.parse(dataFromLocalStorage);
  const [citiesList, setCitiesList] = useState(FAKE_HISTORY); // TODO remove FAKE and place list

  useEffect(() => {
    getCoordinates().then((data) => {
      console.log('data: ', data);
      setCoordinates({ latitude: data.latitude, longitude: data.longitude });
      setCity(data.city);
      setCountryCode(data.country);

      getWeather(data.latitude, data.longitude, 'en')
        .then((weather) => {
          console.log('weather: ', weather);
          setWeather48Hours(weather.hourly);
          setWeatherWeek(weather.daily);
          setCurrentTemperature(weather.currently.temperature);
          const txt = `${weather.currently.summary}, Wind - ${weather.currently.windSpeed} m/s`;
          setWeatherDescription(txt);
        })
        .catch((e) => {
          console.log('e: ', e);
        });
    });
  }, [citiesList]);

  const handleAddCity = (): void => {
    const id = fakerator.random.masked('aaa-AAA_999999:*');
    const color = getRandomColor();
    const newCitiesList = [
      {
        color,
        id,
        city,
        coordinates,
      },
      ...citiesList,
    ];
    setCitiesList(newCitiesList);
    localStorage.removeItem(CITIES_LIST);
    localStorage.setItem(CITIES_LIST, JSON.stringify(newCitiesList));
  };

  const handleClearHistory = (): void => {
    localStorage.removeItem(CITIES_LIST);
    setCitiesList([]);
  };

  const handleDeleteCity = (itemId: string) => {
    const newCitiesList = citiesList.filter((item) => item.id !== itemId);
    setCitiesList(newCitiesList);
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

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
        {/* <SavedCities
          citiesList={citiesList}
          handleClearHistory={handleClearHistory}
          handleDeleteCity={handleDeleteCity}
        /> */}
        {/* <Week data={weatherWeek} /> */}
        <DayWeather title="Today" data={weather48Hours} coordinates={coordinates} />
        {/* <DayWeather title="Tomorrow" data={weather48Hours} coordinates={coordinates} /> */}
      </div>
    </ThemeProvider>
  );
};

export default App;

// TODO env-cmd разобраться что за модуль
// TODO typescript in devDependencies
