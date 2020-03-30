/* eslint-disable react/no-array-index-key */
/* eslint-disable no-useless-computed-key */
import React from 'react';
import { connect } from 'react-redux';
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

import { removeCityToHistory, clearHistory, refreshCoordinates } from '../redux/actions';
import { HistoryItem, Coordinates } from '../types';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 10px 40px',
  },
  history: {
    display: 'grid',
    gridTemplateColumns: '200px 200px 200px 200px',
    gridGap: '20px 20px',
    ['@media (max-width: 900px)']: {
      gridTemplateColumns: '200px 200px',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  city: {
    position: 'relative',
    height: 100,
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.primary.light,
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
  deleteAllBtn: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    right: 10,
  },
}));

interface MapStateProps {
  history: Array<HistoryItem>;
}

interface MapDispatchProps {
  deleteCityFromHistory: (id: string) => void;
  setEmptyHistory: () => void;
  setCoordinates: (data: Coordinates) => void;
}

type SavedCitiesProps = MapStateProps & MapDispatchProps;

const SavedCities: React.FC<SavedCitiesProps> = (props) => {
  const { history, deleteCityFromHistory, setEmptyHistory, setCoordinates } = props;
  const styles = useStyles();

  const showList = history.length < 8 ? history.slice() : history.slice(0, 7);
  showList.reverse();

  const handleRequest = (id: string, coordinates: Coordinates) => {
    console.log(id);
    console.log(coordinates);

    setCoordinates(coordinates);
  };

  return (
    <div className={styles.container}>
      <Typography variant="h2" component="h2">
        Сохраненные города
      </Typography>
      <Tooltip title="Clear history" aria-label="Clear history">
        <Fab color="primary" className={styles.deleteAllBtn} onClick={setEmptyHistory}>
          <DeleteIcon />
        </Fab>
      </Tooltip>
      {showList.length === 0 ? (
        <Alert severity="info" variant="outlined">
          Ваша история пуста. Возможно, самое время пополнить коллекцию?
        </Alert>
      ) : (
        <div className={styles.history}>
          {showList.map((cityData: HistoryItem) => {
            const { id, city, color, coordinates } = cityData;
            return (
              <Card
                key={id}
                className={styles.city}
                style={{ backgroundColor: color }}
                onClick={() => handleRequest(id, coordinates)}
              >
                <CardContent>
                  <Typography variant="body1" component="p">
                    {city}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Tooltip title={`Delete ${city}`} aria-label="Clear history">
                    <Fab
                      size="small"
                      className={styles.deleteBtn}
                      onClick={() => deleteCityFromHistory(id.toString())}
                    >
                      <DeleteIcon />
                    </Fab>
                  </Tooltip>
                </CardActions>
              </Card>
            );
          })}
          <Button variant="contained" className={styles.showHistory}>
            Показать всю историю
          </Button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ history }: MapStateProps) => ({ history });

// TODO refactor mapDispatchToProps
const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteCityFromHistory: (id: any) => dispatch(removeCityToHistory(id)),
    setEmptyHistory: () => dispatch(clearHistory()),
    setCoordinates: (data: Coordinates) => refreshCoordinates(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedCities);
