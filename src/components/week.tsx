/* eslint-disable no-useless-computed-key */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import theme from '../themes/theme';

const useStyles = makeStyles(() => ({
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
const colormap = [
  theme.palette.primary.dark,
  theme.palette.primary.light,
  theme.palette.primary.main,
  theme.palette.secondary.main,
  theme.palette.primary.dark,
  theme.palette.primary.light,
  theme.palette.primary.main,
  theme.palette.secondary.main,
];

interface WeekInfo {
  data: any; // TODO check all any types
}

const Week: React.FC<WeekInfo> = ({ data }) => {
  const styles = useStyles();
  const weekDays = ['1', '2', '3', '4', '5', '6', '7'];
  console.log('week data: ', data);

  return (
    <div className={styles.weekDays}>
      {weekDays.map((day: string, i: number) => {
        return (
          <Paper elevation={1} className={styles.day}>
            {day}
          </Paper>
        );
      })}
    </div>
  );
};

export default Week;
