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

import { addCityToHistory, removeCityToHistory, clearHistory } from '../redux/actions';
import { Coordinates, HistoryItem } from '../types';

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
  deleteAllBtn: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    right: 10,
  },
}));

// interface SavedCitiesProps {
//   history: any;
//   handleClearHistory: () => void;
//   handleDeleteCity: (item: string) => void;
// }

interface CityData {
  id: string;
  city: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  color: string;
}

interface MapStateProps {
  history: Array<HistoryItem>;
}

interface MapDispatchProps {
  setNewCityToHistory: (item: HistoryItem) => void;
  deleteCityFromHistory: (id: string) => void;
  setEmptyHistory: () => void;
}

type SavedCitiesProps = MapStateProps & MapDispatchProps;

const SavedCities: React.FC<SavedCitiesProps> = (props) => {
  const { history, setNewCityToHistory, deleteCityFromHistory, setEmptyHistory } = props;
  const styles = useStyles();

  const showList = history.length < 8 ? history : history.slice(0, 7);

  return (
    <div className={styles.container}>
      <Typography variant="h2" component="h2">
        Saved Cities
      </Typography>
      <Tooltip title="Clear history" aria-label="Clear history">
        <Fab color="primary" className={styles.deleteAllBtn} onClick={setEmptyHistory}>
          <DeleteIcon />
        </Fab>
      </Tooltip>
      {showList.length === 0 ? (
        <Alert severity="info" variant="outlined">
          Yout history is empty. You can add place clicking on Add button higher.
        </Alert>
      ) : (
        <div className={styles.history}>
          {showList.map((cityData: HistoryItem, i: number) => {
            const { id, city, color } = cityData;
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
                      onClick={() => deleteCityFromHistory('aaa-AAA_999999:1')}
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

const mapStateToProps = ({ history }: MapStateProps) => ({ history });

// TODO refactor mapDispatchToProps
const mapDispatchToProps = (dispatch: any) => {
  return {
    setNewCityToHistory: (history: HistoryItem) => dispatch(addCityToHistory(history)),
    deleteCityFromHistory: (id: string) => dispatch(removeCityToHistory(id)),
    setEmptyHistory: () => dispatch(clearHistory()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedCities);
