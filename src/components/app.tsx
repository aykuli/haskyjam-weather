import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import theme from '../themes/theme';
import getCoordinates from '../services/get-coordinates';
import getWeather from '../services/get-weather';
import {
  refreshCoordinates,
  changeCity,
  changeCountry,
  changeWeatherInfo,
  changeCurrentTemperature,
  changeWeatherForNext48Hours,
  changeWeatherWeek,
} from '../redux/actions';

// components
import Navbar from './navbar';
import CurrentWeather from './current-weather';
import SavedCities from './saved-cities';
import Week from './week';
import DayWeather from './day-weather';

// contantas
import { CITIES_LIST, NAVBAR_BTNS } from '../constantas/common';
import FAKE_HISTORY from '../services/fake-history';

import { Coordinates } from '../types';

// TODO round temparatures to 1number after comma
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

const App = (props: any) => {
  const {
    temperature,
    currentTab,
    setCoordinates,
    setCity,
    setCountry,
    setWeatherInfo,
    setCurrentTemperature,
    setWeather48hours,
    setWeatherWeek,
  } = props;
  // const isMainPage = currentTab === NAVBAR_BTNS[0];

  const styles = useStyles();

  const [citiesList, setCitiesList] = useState(FAKE_HISTORY); // TODO remove FAKE and place list

  useEffect(() => {
    getCoordinates().then((data) => {
      console.log('data: ', data);
      const { latitude, longitude } = data;

      setCoordinates({ latitude, longitude });
      setCity(data.city);
      setCountry(data.country);

      getWeather(latitude, longitude, 'en')
        .then((weather) => {
          console.log('weather: ', weather.hourly);
          setWeather48hours(weather.hourly);
          setWeatherWeek(weather.daily);
          setCurrentTemperature(weather.currently.temperature);
          const txt = `${weather.currently.summary}, Wind - ${weather.currently.windSpeed} m/s`;
          setWeatherInfo(txt);
        })
        .catch((e) => {
          console.log('e: ', e);
        });
    });
  }, [citiesList]);

  const handleClearHistory = (): void => {
    localStorage.removeItem(CITIES_LIST);
    setCitiesList([]);
  };

  const handleDeleteCity = (itemId: string) => {
    const newCitiesList = citiesList.filter((item) => item.id !== itemId);
    setCitiesList(newCitiesList);
  };

  const componentMaps = new Map();
  componentMaps.set(
    NAVBAR_BTNS[0],
    <SavedCities
      citiesList={citiesList}
      handleClearHistory={handleClearHistory}
      handleDeleteCity={handleDeleteCity}
    />
  );
  componentMaps.set(NAVBAR_BTNS[1], <DayWeather title={NAVBAR_BTNS[1]} />);
  componentMaps.set(NAVBAR_BTNS[2], <DayWeather title={NAVBAR_BTNS[2]} />);
  componentMaps.set(NAVBAR_BTNS[3], <Week />);

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

interface MapStateProps {
  currentTab: string;
  coordinates: Coordinates;
  city: string;
  country: string;
  temperature: number;
}

const mapStateToProps = ({ currentTab, country, temperature }: MapStateProps) => ({
  currentTab,
  country,
  temperature,
});

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     setCoordinates: (data: Coordinates) => dispatch(refreshCoordinates(data)),
//     setCity: (str: string) => dispatch(changeCity(str)),
//     setCountry: (str: string) => dispatch(changeCountry(str)),
//     setWeatherInfo: (str: string) => dispatch(changeWeatherInfo(str)),
//     setCurrentTemperature: (numb: number) => dispatch(changeCurrentTemperature(numb)),
//     setWeather48hours: (data: any) => dispatch(changeWeatherForNext48Hours(data)),
//     setWeekWeather: (data: any) => dispatch(changeWeekWeather(data)),
//   };
// };

const mapDispatchToProps = (dispatch: any) => {
  return {
    setCoordinates: (data: Coordinates) => dispatch(refreshCoordinates(data)),
    setCity: (str: string) => dispatch(changeCity(str)),
    setCountry: (str: string) => dispatch(changeCountry(str)),
    setWeatherInfo: (str: string) => dispatch(changeWeatherInfo(str)),
    setCurrentTemperature: (numb: number) => dispatch(changeCurrentTemperature(numb)),
    setWeather48hours: (data: any) => dispatch(changeWeatherForNext48Hours(data)),
    setWeatherWeek: (data: any) => dispatch(changeWeatherWeek(data)),
  };
};
// TODO refactor here

export default connect(mapStateToProps, mapDispatchToProps)(App);

// TODO env-cmd разобраться что за модуль
// TODO App ConnectedApp поменять местами
