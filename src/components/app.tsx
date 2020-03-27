import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import theme from '../themes/theme';
import getCoordinates from '../services/get-coordinates';
import getWeather from '../services/get-weather';

import Navbar from './navbar';
import CurrentWeather from './current-weather';
import SavedCities from './saved-cities';

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
  const [city, setCity] = useState('Moscow');
  const [countryCode, setCountryCode] = useState('GB');
  const [currentTemp, setCurrentTemp] = useState(15);
  const [weatherDesc, setWeatherDesc] = useState('null');

  useEffect(() => {
    // getCoordinates().then((data) => {
    //   setPlaceInfo(data);
    //   setCity(data.city);
    //   setCountryCode(data.country);
    // getWeather(data.latitude, data.longitude, 'en').then((weather) => {
    //   // console.log('weather: ', weather.weather[0].);
    //   setCurrentTemp(weather.main.temp);
    //   setWeatherDesc(weather.weather[0].description);
    // });
    // });
  }, []);
  const citiesList = ['city0', 'city1', 'city2', 'city3', 'city4', 'city5', 'city6', 'city7'];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.container}>
        <Navbar />
        {placeInfo.latitude !== 0 ? (
          <CurrentWeather
            temperature={currentTemp}
            city={city}
            countryCode={countryCode}
            isMainPage
            weatherInfo="Clear, wind sometimes"
          />
        ) : (
          <>Sceleton will be here</>
        )}
        <SavedCities citiesList={citiesList} />
      </div>
    </ThemeProvider>
  );
};

export default App;

// TODO env-cmd разобраться что за модуль
// TODO typescript in devDependencies
