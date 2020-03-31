import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  errorContainer: {
    display: 'flex',
    flexGrow: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: 400,
    padding: 40,
    margin: '40px auto',
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: 10,
    zIndex: 5,
  },
  titleWrap: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    margin: 0,
    marginLeft: 30,
    color: theme.palette.primary.dark,
  },
  info: {},
}));

const ErrorIndicator = () => {
  const styles = useStyles();
  return (
    <div className={styles.errorContainer}>
      <div className={styles.titleWrap}>
        <ErrorOutlineIcon color="primary" fontSize="large" />
        <Typography variant="h1" className={styles.title}>
          BOOM!
        </Typography>
      </div>
      <div className={styles.info}>
        <Typography variant="body2">
          Something has gone terrribly wrong, but we already send droid to fix it.
        </Typography>
      </div>
    </div>
  );
};

export default ErrorIndicator;
