/* eslint-disable no-useless-computed-key */
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

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

interface WeekInfo {
  data: any; // TODO check all any types
}
// TODO icons

const Week: React.FC<WeekInfo> = ({ data }) => {
  const styles = useStyles();

  console.log('week data: ', data);
  const today = new Date();
  const firstDay = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const option = {
    day: 'numeric',
    month: 'long',
  };

  const week = [];
  if (data) {
    for (let i = 1; i < 8; i += 1) {
      const day = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
      const { temperatureMin, temperatureMax } = data.data[i];
      const temperature = Math.floor((temperatureMin + temperatureMax) / 2);

      week.push({
        weekDay: day.toLocaleDateString('en-US', { weekday: 'long' }),
        date: day.toLocaleDateString('en-US', { day: 'numeric', month: 'long' }),
        temperature,
      });
    }
  }

  console.log('week: ', week);
  return (
    <div className={styles.container}>
      <Typography variant="h2" component="h2">
        Week
      </Typography>
      <Typography variant="body1" component="p">
        {`${firstDay.toLocaleDateString('en-US', option)} - ${nextWeek.toLocaleDateString(
          'en-US',
          option
        )}`}
      </Typography>
      <div className={styles.weekDays}>
        {data
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

export default Week;
