import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    boxShadow: theme.shadows[1],
  },
}));

const getDate = (lang: string) => {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  return formatter.format(date);
};
interface CurrentWeatherType {
  temperature: number;
  city: string;
  countryCode: string;
  weatherInfo: string;
  isMainPage: boolean;
}

const CurrentWeather = ({
  temperature,
  city,
  countryCode,
  weatherInfo,
  isMainPage,
}: CurrentWeatherType) => {
  const styles = useStyles();
  const date = getDate('en'); // TODO we can make language changing

  return (
    <div className={styles.main}>
      <Typography variant="h1" component="p">{`${temperature} °C`}</Typography>
      <Typography variant="body1" component="p">{`${city}, ${countryCode}`}</Typography>
      {isMainPage ? (
        <>
          <Typography variant="body1" component="p">
            {date}
          </Typography>
          <Typography variant="body2" component="p">
            {weatherInfo}
          </Typography>
        </>
      ) : null}
    </div>
  );
};

export default CurrentWeather;
