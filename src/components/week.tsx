/* eslint-disable no-useless-computed-key */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import theme from '../themes/theme';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 10px 40px',
  },
  weekDays: {},
  day: {
    width: 50,
    height: 50,
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

const Week = () => {
  const styles = useStyles();
  const weekDays = ['1', '2', '3', '4', '5', '6', '7'];

  return (
    <div className={styles.container}>
      <div className={styles.weekDays}>
        {weekDays.map((day: string, i: number) => {
          const color = colormap[i];
          return (
            <Button
              variant="contained"
              key={day}
              className={styles.day}
              style={{ backgroundColor: color }}
            >
              {day}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Week;
