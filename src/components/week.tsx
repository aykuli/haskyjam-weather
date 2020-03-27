/* eslint-disable no-useless-computed-key */
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: '10px 10px 40px',
  },
  weekDays: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 10px 40px',
  },
  day: {
    margin: theme.spacing(1),
    minWidth: 200,
    height: theme.spacing(16),
    // height: 50,
    backgroundColor: theme.palette.primary.light,
  },
}));

interface WeekInfo {
  data: any; // TODO check all any types
}

const Week: React.FC<WeekInfo> = ({ data }) => {
  const styles = useStyles();
  const weekDays = ['1', '2', '3', '4', '5', '6', '7'];
  // console.log('week data: ', data);
  const firstDay = new Date();
  const nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
  // console.log('firstDay: ', firstDay, '\nnextWeek: ', nextWeek)
  const date = '111111111111';

  return (
    <div className={styles.container}>
      <Typography variant="h2" component="h2">
        Week
      </Typography>
      <Typography variant="body1" component="p">
        {date}
      </Typography>
      <div className={styles.weekDays}>
        {weekDays.map((day: string) => {
          return (
            <Paper elevation={1} className={styles.day} key={day}>
              {day}
            </Paper>
          );
        })}
      </div>
    </div>
  );
};

export default Week;
