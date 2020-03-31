import React from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

import { HistoryItem, WeatherWeekProp } from '../types';
import { addCityToHistory } from '../redux/actions';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: '10px 40px 40px',
  },
  weekDays: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  day: {
    margin: theme.spacing(1),
    minWidth: 200,
    height: 200,
    padding: 20,
  },
  temperature: {
    textAlign: 'right',
  },
}));

interface MapStateProps {
  weatherWeek: WeatherWeekProp;
}

interface DispatchProps {
  setNewCityToHistory: (history: HistoryItem) => void;
}

type MapProps = MapStateProps & DispatchProps;

const Week = (props: MapProps) => {
  const { weatherWeek } = props;
  const styles = useStyles();

  const today = new Date();
  const firstDay = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const option = {
    day: 'numeric',
    month: 'long',
  };

  const week = [];
  if (weatherWeek) {
    for (let i = 1; i < 8; i += 1) {
      const day = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
      const { temperatureMin, temperatureMax } = weatherWeek.data[i];
      const temperature = Math.floor((temperatureMin + temperatureMax) / 2);

      week.push({
        weekDay: day.toLocaleDateString('ru-RU', { weekday: 'long' }),
        date: day.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }),
        temperature,
      });
    }
  }

  return (
    <div className={styles.container}>
      <Typography variant="h2" component="h2">
        НЕДЕЛЯ
      </Typography>
      <Typography variant="body1" component="p">
        {`${firstDay.toLocaleDateString('ru-RU', option)} - ${nextWeek.toLocaleDateString(
          'ru-RU',
          option
        )}`}
      </Typography>
      <div className={styles.weekDays}>
        {weatherWeek
          ? week.map((item): any => {
              const { weekDay, date, temperature } = item;
              return (
                <Paper elevation={3} className={styles.day} key={weekDay}>
                  <Typography variant="h3" component="h3">
                    {date}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {weekDay}
                  </Typography>
                  <Typography variant="h1" component="p" className={styles.temperature}>
                    {`${temperature} °C`}
                  </Typography>
                </Paper>
              );
            })
          : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootStateOrAny) => ({
  weatherWeek: state.weatherWeek,
});

const mapDispatchToProps = {
  setNewCityToHistory: (history: HistoryItem) => addCityToHistory(history),
};

export default connect<MapStateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Week);
