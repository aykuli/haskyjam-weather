import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
}));

const SavedCities = () => {
  const styles = useStyles();

  return (
    <div className={styles.main}>
      <Typography variant="h2" component="h2">
        Saved Cities
      </Typography>
    </div>
  );
};

export default SavedCities;
