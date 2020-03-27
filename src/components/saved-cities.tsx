/* eslint-disable react/no-array-index-key */
/* eslint-disable no-useless-computed-key */
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  Typography,
  Button,
  Fab,
  Tooltip,
  Card,
  CardActions,
  CardContent,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
// TODO delete interpolate

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 10px 40px',
  },
  citiesList: {
    display: 'grid',
    gridTemplateColumns: '200px 200px 200px 200px',
    gridGap: '20px 20px',
    ['@media (max-width: 900px)']: {
      gridTemplateColumns: '200px 200px',
    },
  },
  city: {
    position: 'relative',
    backgroundColor: theme.palette.primary.light,
    height: 100,
    opacity: 0.8,
    '&:hover': {
      opacity: 1,
    },
  },
  showHistory: {
    height: '100%',
  },
  deleteBtn: {
    position: 'absolute',
    zIndex: 1,
    top: 5,
    right: 5,
    backgroundColor: 'transparent',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: theme.shadows[2],
    },
  },
}));
// TODO сохраняем в историю id, координаты и название города. координаты - для поиска погоды потом точно, название города - для показа на панели. id - чтобы удалить потом из истории при необходимости.
interface SavedCitiesProps {
  citiesList: any;
  handleClearHistory: () => void;
  handleDeleteCity: (item: any) => void;
}

interface CityData {
  id: string;
  city: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}
const colormap = [
  '#3FB4F5',
  '#CE494C',
  'rgb(226, 190, 217)',
  '#FFF5D8',
  '#68D3BB',
  '#E7DDFF',
  '#285FAA',
  '#FFF5D8',
];

const SavedCities: React.FC<SavedCitiesProps> = ({
  citiesList,
  handleClearHistory,
  handleDeleteCity,
}) => {
  const styles = useStyles();

  const showList = citiesList.length < 8 ? citiesList : citiesList.slice(0, 7);

  return (
    <div className={styles.container}>
      <Typography variant="h2" component="h2">
        Saved Cities
      </Typography>
      <Tooltip title="Clear history" aria-label="Clear history">
        <Fab color="primary" className={styles.deleteBtn} onClick={handleClearHistory}>
          <DeleteIcon />
        </Fab>
      </Tooltip>
      {showList.length === 0 ? (
        <Alert severity="info" variant="outlined">
          Yout history is empty. You can add place clicking on Add button higher.
        </Alert>
      ) : (
        <div className={styles.citiesList}>
          {showList.map((cityData: CityData, i: number) => {
            const color = colormap[i];
            const { id, city } = cityData;
            return (
              <Card key={id} className={styles.city} style={{ backgroundColor: color }}>
                <CardContent>
                  <Typography variant="h3" component="span">
                    {city}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Tooltip title={`Delete ${city}`} aria-label="Clear history">
                    <Fab
                      size="small"
                      className={styles.deleteBtn}
                      onClick={() => handleDeleteCity(id)}
                    >
                      <DeleteIcon />
                    </Fab>
                  </Tooltip>
                </CardActions>
              </Card>
            );
          })}
          <Button variant="contained" className={styles.showHistory}>
            Show all history
          </Button>
        </div>
      )}
    </div>
  );
};

export default SavedCities;
