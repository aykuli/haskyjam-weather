/* eslint-disable react/no-array-index-key */
/* eslint-disable no-useless-computed-key */
import React, { useState } from 'react';
import { connect, RootStateOrAny } from 'react-redux';
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

import HistoryModal from './history-modal';

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

interface StateProps {
  history: Array<HistoryItem>;
}

interface DispatchProps {
  deleteCityFromHistory: (id: string) => void;
  setEmptyHistory: () => void;
  setCoordinates: (data: Coordinates) => void;
}

type SavedCitiesProps = StateProps & DispatchProps;

const SavedCities: React.FC<SavedCitiesProps> = (props) => {
  const { history, deleteCityFromHistory, setEmptyHistory, setCoordinates } = props;
  const [isShowHistoryModal, setIsShowHistoryModal] = useState<boolean>(false);
  const styles = useStyles();

  const showList = history.length < 8 ? history.slice() : history.slice(0, 7);
  showList.reverse();

  const handleRequest = (coordinates: Coordinates) => {
    setCoordinates(coordinates);
  };

  const handleShowHistory = () => {
    console.log('show history');
    setIsShowHistoryModal(!isShowHistoryModal);
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
                onClick={() => handleRequest(coordinates)}
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
          <Button variant="contained" className={styles.showHistory} onClick={handleShowHistory}>
            Показать всю историю
          </Button>
        </div>
      )}
      {isShowHistoryModal ? (
        <HistoryModal
          isOpen={isShowHistoryModal}
          hideHistory={() => setIsShowHistoryModal(false)}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: RootStateOrAny) => ({
  history: state.history,
});

const mapDispatchToProps = {
  deleteCityFromHistory: (id: any) => removeCityToHistory(id),
  setEmptyHistory: () => clearHistory(),
  setCoordinates: (data: Coordinates) => refreshCoordinates(data),
};

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(SavedCities);
