import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import Fakerator from 'fakerator';

import theme from '../themes/theme';
import getCoordinates from '../services/get-coordinates';
import getWeather from '../services/get-weather';
import getRandomColor from '../services/color-generator';
import { refreshCoordinates } from '../redux/actions';

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

const ConnectedApp = (props: any) => {
  console.log('App props: ', props);
  const { currentTab, setCoordinates } = props;
  const isMainPage = currentTab === NAVBAR_BTNS[0];
  
  const styles = useStyles();
  const fakerator = Fakerator('en-EN');

  const [coordinates, setCoordinates1] = useState({ latitude: 0, longitude: 0 });
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
      const { latitude, longitude } = data;

      setCoordinates({ latitude, longitude });
      setCoordinates1({ latitude, longitude });
      setCity(data.city);
      setCountryCode(data.country);

      getWeather(latitude, longitude, 'en')
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

  const componentMaps = new Map();
  componentMaps.set(
    NAVBAR_BTNS[0],
    <SavedCities
      citiesList={citiesList}
      handleClearHistory={handleClearHistory}
      handleDeleteCity={handleDeleteCity}
    />
  );
  componentMaps.set(
    NAVBAR_BTNS[1],
    <DayWeather title={NAVBAR_BTNS[1]} data={weather48Hours} coordinates={coordinates} />
  );
  componentMaps.set(
    NAVBAR_BTNS[2],
    <DayWeather title={NAVBAR_BTNS[2]} data={weather48Hours} coordinates={coordinates} />
  );
  componentMaps.set(NAVBAR_BTNS[3], <Week data={weatherWeek} />);

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
            isMainPage={isMainPage}
            weatherInfo={weatherDescription}
            handleAddCity={handleAddCity}
          />
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

const mapStateToProps = ({
  currentTab,
  coordinates,
  city,
  country,
  temperature,
}: MapStateProps) => ({
  currentTab,
  coordinates,
  city,
  country,
  temperature,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    setCoordinates: (data: any) => dispatch(refreshCoordinates(data)),
  };
};

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);

export default App;

// TODO env-cmd разобраться что за модуль
