import React from 'react';
import { connect } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Fab, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Fakerator from 'fakerator';

import { addCityToHistory } from '../redux/actions';
import getRandomColor from '../services/color-generator';
import { Coordinates, HistoryItem } from '../types';

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

interface MapStateProps {
  city: string;
  country: string;
  temperature: number;
  weatherInfo: string;
  coordinates: Coordinates;
}

interface MapDispatchProps {
  setNewCityToHistory: (item: HistoryItem) => void;
}

type Props = MapStateProps & MapDispatchProps;

const CurrentWeather = (props: Props) => {
  const { temperature, city, country, weatherInfo, coordinates, setNewCityToHistory } = props;

  const fakerator = Fakerator('en-EN');

  const handleAddCity = () => {
    const id = fakerator.random.masked('aaa-AAA_999999:*');
    const color = getRandomColor();
    setNewCityToHistory({
      color,
      id,
      city,
      coordinates,
    });
  };

  const styles = useStyles();
  const date = getDate('en'); // TODO we can make language changing

  return (
    <div className={styles.main}>
      <Typography variant="h1" component="p">{`${temperature} °C`}</Typography>
      <Typography variant="body1" component="p">{`${city}, ${country}`}</Typography>
      <>
        <Typography variant="body1" component="p">
          {date}
        </Typography>
        <Typography variant="body2" component="p">
          {weatherInfo}
        </Typography>
      </>
      <Tooltip title="Add place to history" aria-label="Add place to history">
        <Fab color="primary" className={styles.addCity} onClick={handleAddCity}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};

const mapStateToProps = ({
  city,
  country,
  temperature,
  weatherInfo,
  coordinates,
}: MapStateProps) => ({
  city,
  country,
  temperature,
  weatherInfo,
  coordinates,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    setNewCityToHistory: (history: HistoryItem) => dispatch(addCityToHistory(history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeather);
