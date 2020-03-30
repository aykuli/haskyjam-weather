import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  marker: {
    transform: 'translate(0, 0)',
    // color: theme.palette.primary.main,
  },
  user: {
    position: 'relative',
    cursor: 'pointer',
    outline: 'none',
    '& svg': {
      fill: theme.palette.error.dark,
    },
  },
  popup: {
    maxWidth: '70%',
    transform: 'none',

    '& h2': {
      margin: '0 0 10px 0',
    },
    '& p': {
      margin: 0,
    },
    '& .mapboxgl-popup-content': {
      minWidth: 50,
      boxShadow: '2px 2px 10px rgba(0, 0, 0, .53)',
    },
  },
}));

const Input = () => {
  const styles = useStyles();

  return <>INPUT</>;
};

export default Input;
