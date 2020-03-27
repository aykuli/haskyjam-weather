import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Fab, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

// TODO icons
const useStyles = makeStyles((theme: Theme) => ({
  main: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    boxShadow: theme.shadows[1],
  },
  addCity: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    right: 10,
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
interface CurrentWeatherProps {
  temperature: number | null;
  city: string | null;
  countryCode: string | null;
  weatherInfo: string | null;
  isMainPage: boolean;
  handleAddCity: () => void;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  temperature,
  city,
  countryCode,
  weatherInfo,
  isMainPage,
  handleAddCity,
}) => {
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
      <Tooltip title="Add place to history" aria-label="Add place to history">
        <Fab color="primary" className={styles.addCity} onClick={handleAddCity}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default CurrentWeather;
