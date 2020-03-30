import React, { useEffect } from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import theme from '../themes/theme';
import getCoordinates from '../services/get-coordinates';
import getWeatherByCoordinates from '../services/get-weather';
import {
  refreshCoordinates,
  changeCity,
  changeCountry,
  changeWeatherInfo,
  changeCurrentTemperature,
  changeWeatherForNext48Hours,
  changeWeatherWeek,
} from '../redux/actions';
import { Coordinates, Weather48HoursProp, WeatherWeekProp } from '../types';
import { reverseGeocoding } from '../services/opencagedata';

// components
import Navbar from './navbar';
import CurrentWeather from './current-weather';
import SavedCities from './saved-cities';
import Week from './week';
import DayWeather from './day-weather';

// contantas
import { NAVBAR_BTNS } from '../constantas/common';

// TODO round temparatures to 1 number after comma
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

interface MapStateProps {
  currentTab: string;
  temperature: number;
  coordinates: Coordinates;
}

interface DispatchProps {
  setCoordinates: (data: Coordinates) => void;
  setCity: (str: string) => void;
  setCountry: (str: string) => void;
  setWeatherInfo: (str: string) => void;
  setCurrentTemperature: (numb: number) => void;
  setWeather48hours: (data: Weather48HoursProp) => void;
  setWeatherWeek: (data: any) => void;
}

type AppProps = MapStateProps & DispatchProps;

const App = (props: AppProps) => {
  const {
    temperature,
    currentTab,
    coordinates,
    setCoordinates,
    setCity,
    setCountry,
    setWeatherInfo,
    setCurrentTemperature,
    setWeather48hours,
    setWeatherWeek,
  } = props;

  const styles = useStyles();

  useEffect(() => {
    getCoordinates().then((data) => {
      console.log('getCoordinates data: ', data);
      const { latitude, longitude } = data;

      setCoordinates({ latitude, longitude });
    });
  }, [
    setCoordinates,
    setCity,
    setCountry,
    setCurrentTemperature,
    setWeather48hours,
    setWeatherInfo,
    setWeatherWeek,
  ]);

  useEffect(() => {
    console.log('здесь же должно меняться!!!');
    const { latitude, longitude } = coordinates;
    reverseGeocoding(latitude, longitude).then((data) => {
      // const timezone = data.results[0].annotations.timezone.name;
      const { city, country } = data.results[0].components;
      setCity(city);
      setCountry(country);
      if (city) {
        window.history.pushState({ page: city }, city, `city=${city}`);
      }
    });
    getWeatherByCoordinates(latitude, longitude, 'ru')
      .then((weather) => {
        console.log('weather: ', weather);
        setWeather48hours(weather.hourly);
        setWeatherWeek(weather.daily);
        setCurrentTemperature(weather.currently.temperature);
        const txt = `${weather.currently.summary}, Ветер - ${weather.currently.windSpeed} м/с`;
        setWeatherInfo(txt);
      })
      .catch((e) => {
        console.log('error: ', e);
        // TODO show popup with error
      });
  }, [
    coordinates,
    setCity,
    setCountry,
    setCurrentTemperature,
    setWeather48hours,
    setWeatherInfo,
    setWeatherWeek,
  ]);
  const componentMaps = new Map();
  componentMaps.set(NAVBAR_BTNS[0], <SavedCities />);
  componentMaps.set(NAVBAR_BTNS[1], <DayWeather title={NAVBAR_BTNS[1]} />);
  componentMaps.set(NAVBAR_BTNS[2], <DayWeather title={NAVBAR_BTNS[2]} />);
  componentMaps.set(NAVBAR_BTNS[3], <Week />);
  // TODO может скелетоны перенести внутрь CurrentWeather component
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.container}>
        <Navbar />
        {temperature === null ? (
          <div className={styles.sceleton}>
            <Skeleton variant="circle" width={50} height={50} className={styles.addBtn} />
            <Skeleton variant="text" width={50} height={70} />
            <Skeleton variant="text" width={300} height={50} />
            <Skeleton variant="rect" width={300} height={118} />
          </div>
        ) : (
          <CurrentWeather />
        )}
        {componentMaps.get(currentTab)}
      </div>
    </ThemeProvider>
  );
};

const mapStateToProps = (state: RootStateOrAny) => ({
  currentTab: state.currentTab,
  temperature: state.temperature,
  coordinates: state.coordinates,
});

const mapDispatchToProps = {
  setCoordinates: (data: Coordinates) => refreshCoordinates(data),
  setCity: (str: string) => changeCity(str),
  setCountry: (str: string) => changeCountry(str),
  setWeatherInfo: (str: string) => changeWeatherInfo(str),
  setCurrentTemperature: (numb: number) => changeCurrentTemperature(numb),
  setWeather48hours: (data: Weather48HoursProp) => changeWeatherForNext48Hours(data),
  setWeatherWeek: (data: WeatherWeekProp) => changeWeatherWeek(data),
};

export default connect<MapStateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(App);

// TODO env-cmd разобраться что за модуль
