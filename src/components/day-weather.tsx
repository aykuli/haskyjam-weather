/* eslint-disable no-useless-computed-key */
import React from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

import Map from './map';

import { NAVBAR_BTNS } from '../constantas/common';
import { numberFit, temperatureZeroFit } from '../utils/temperature-fit';
import { Weather48HoursProp, HistoryItem } from '../types';
import { addCityToHistory } from '../redux/actions';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    minHeight: 550,
    padding: 40,
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
    ['@media (max-width: 520px)']: {
      padding: '20px 20px 40px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '10px 10px 40px',
    },
  },
  info: {
    width: 400,
    marginRight: 20,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 40,
      marginRight: 0,
    },
  },
  table: {
    minWidth: 250,
    '& td, & td:last-child, & td:first-child': {
      padding: '5px 7px',
    },
    '& td, & th': {
      fontSize: '1rem',
    },
  },
  headRow: {
    backgroundColor: theme.palette.primary.main,
  },
  tableHeader: {
    color: theme.palette.text.secondary,
  },
}));

interface MapStateProps {
  weather48Hours: Weather48HoursProp;
}

interface OwnProps {
  title: string;
}

type Props = MapStateProps & OwnProps;

const DayWeather = (props: Props) => {
  const { title, weather48Hours } = props;
  const styles = useStyles();
  const today = new Date();
  const day = title === NAVBAR_BTNS[1] ? today : new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const level = day.getDate();
  const date = day.toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Typography variant="h2" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          {date}
        </Typography>
        <TableContainer component={Paper}>
          <Table className={styles.table} size="small" aria-label={`${title} weather`}>
            <TableHead>
              <TableRow className={styles.headRow}>
                <TableCell className={styles.tableHeader}>Время</TableCell>
                <TableCell className={styles.tableHeader}>Температура</TableCell>
                <TableCell className={styles.tableHeader}>Описание</TableCell>
                <TableCell className={styles.tableHeader}>Ветер</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {weather48Hours
                ? weather48Hours.data.map((item: any) => {
                    const { time, temperature, summary, windSpeed } = item;
                    const timeConverted = new Date(time * 1000);
                    const hoursView = (hour: number) => (hour < 10 ? `0${hour}` : hour);
                    const isRender =
                      level === timeConverted.getDate() && timeConverted.getHours() % 3 === 0;
                    const temperatureFitted = temperatureZeroFit(numberFit(temperature));
                    const windFitted = numberFit(windSpeed);
                    return isRender ? (
                      <TableRow key={item.time}>
                        <TableCell>
                          {`${hoursView(timeConverted.getHours())}: ${timeConverted.getMinutes()}0`}
                        </TableCell>
                        <TableCell>{`${temperatureFitted} °C`}</TableCell>
                        <TableCell>{summary}</TableCell>
                        <TableCell>{`${windFitted} м/с`}</TableCell>
                      </TableRow>
                    ) : null;
                  })
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Map />
    </div>
  );
};

const mapStateToProps = (state: RootStateOrAny) => ({
  weather48Hours: state.weather48Hours,
});

interface DispatchProps {
  setNewCityToHistory: (history: HistoryItem) => void;
}

const mapDispatchToProps = {
  setNewCityToHistory: (history: HistoryItem) => addCityToHistory(history),
};

export default connect<MapStateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(DayWeather);
