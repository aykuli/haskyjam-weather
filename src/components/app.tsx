import React, { useState, useEffect } from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import theme from '../themes/theme';
import getCoordinates from '../services/get-coordinates';
import getWeatherByCoordinates from '../services/get-weather';
import { numberFit, temperatureZeroFit } from '../utils/temperature-fit';
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
import PopupMessage from './popup-message';
import ErrorBoundry from './error-boundry';

// contantas
import {
  NAVBAR_BTNS,
  FETCH_WEATHER_FAILED,
  FETCH_GEOCODING_FAILED,
  FETCH_COORDINATES_FAILED,
} from '../constantas/common';

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
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>('Все в порядке!');

  useEffect(() => {
    let timerId: any;
    getCoordinates()
      .then((data) => {
        const { latitude, longitude } = data;

        setCoordinates({ latitude, longitude });
      })
      .catch((e) => {
        console.log('getCoordinates error: ', e);
        setMsg(FETCH_COORDINATES_FAILED);
        timerId = setTimeout(() => {
          setIsShowPopup(false);
        }, 1000);
      });

    return () => {
      clearTimeout(timerId);
    };
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
    const { latitude, longitude } = coordinates;
    let timerId: any;
    if (latitude && longitude) {
      reverseGeocoding(latitude, longitude)
        .then((data) => {
          const { city, country } = data.results[0].components;
          setCity(city);
          setCountry(country);
          if (city) {
            window.history.pushState({ page: city }, city, `city=${city}`);
          }
        })
        .catch((e) => {
          console.log('reverseGeocoding error: ', e);
          setIsShowPopup(true);
          setMsg(FETCH_GEOCODING_FAILED);
          timerId = setTimeout(() => {
            setIsShowPopup(false);
          }, 1000);
        });
      getWeatherByCoordinates(latitude, longitude, 'ru')
        .then((weather) => {
          setWeather48hours(weather.hourly);
          setWeatherWeek(weather.daily);

          const numberFitted = temperatureZeroFit(numberFit(weather.currently.temperature));
          setCurrentTemperature(numberFitted);
          const windFitted = numberFit(weather.currently.windSpeed);

          const txt = `${weather.currently.summary}, Ветер - ${windFitted} м/с`;
          setWeatherInfo(txt);
        })
        .catch((e) => {
          console.log('getWeatherByCoordinates error: ', e);
          setIsShowPopup(true);
          setMsg(FETCH_WEATHER_FAILED);
          timerId = setTimeout(() => {
            setIsShowPopup(false);
          }, 1000);
        });
    }

    return () => {
      clearTimeout(timerId);
    };
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
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundry>
        <CssBaseline />
        {isShowPopup ? <PopupMessage msg={msg} /> : null}
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
      </ErrorBoundry>
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
