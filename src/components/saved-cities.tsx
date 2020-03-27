/* eslint-disable no-useless-computed-key */
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  citiesList: {
    display: 'grid',
    gridTemplateColumns: '200px 200px 200px 200px',
    gridGap: '20px 20px',
    border: `1px solid ${theme.palette.primary.dark}`,
    ['@media (max-width: 900px)']: {
      gridTemplateColumns: '200px 200px',
    },
  },
  city: {
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.light,
    height: 100,
  },
  showHistory: {
    height: '100%',
  },
}));
// TODO сохраняем в историю id, координаты и название города. координаты - для поиска погоды потом точно, название города - для показа на панели. id - чтобы удалить потом из истории при необходимости.
interface SavedCities {
  citiesList: Array<string>;
}

const SavedCities = ({ citiesList }: SavedCities) => {
  const styles = useStyles();

  const showList = citiesList.length < 8 ? citiesList : citiesList.slice(0, 7);
  console.log(showList.length);

  return (
    <div className={styles.container}>
      <Typography variant="h2" component="h2">
        Saved Cities
      </Typography>
      <div className={styles.citiesList}>
        {showList.map((city: string, i: number) => {
          return (
            <Button variant="contained" key={city} className={styles.city}>
              {city}
            </Button>
          );
        })}
        <Button variant="contained" className={styles.showHistory}>
          Show all history
        </Button>
      </div>
    </div>
  );
};

export default SavedCities;
