/* eslint-disable no-useless-computed-key */
import React from 'react';
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

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
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
    [theme.breakpoints.down('sm')]: {
      '& td, & td:last-child, & td:first-child': {
        padding: '5px 7px',
      },
    },
  },
  headRow: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.light,
  },
}));

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface DayInfo {
  title: string;
  data: any;
  coordinates: Coordinates;
}

const DayWeather: React.FC<DayInfo> = ({ title, data, coordinates }) => {
  const styles = useStyles();
  const today = new Date();
  const day = title === 'Today' ? today : new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const level = day.getDate();
  const date = day.toLocaleDateString('en-US', {
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
        <Typography variant="body1" component="p">
          {date}
        </Typography>
        <TableContainer component={Paper}>
          <Table className={styles.table} size="small" aria-label={`${title} weather`}>
            <TableHead>
              <TableRow className={styles.headRow}>
                <TableCell>Time</TableCell>
                <TableCell>Temperature</TableCell>
                <TableCell>Summary</TableCell>
                <TableCell>Wind</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                ? data.data.map((item: any) => {
                    const { time, temperature, summary, windSpeed } = item;
                    const timeConverted = new Date(time * 1000);
                    const hoursView = (hour: number) => (hour < 10 ? `0${hour}` : hour);
                    const isRender =
                      level === timeConverted.getDate() && timeConverted.getHours() % 3 === 0;

                    return isRender ? (
                      <TableRow key={item.time}>
                        <TableCell>
                          {`${hoursView(timeConverted.getHours())}: ${timeConverted.getMinutes()}0`}
                        </TableCell>
                        <TableCell>{`${temperature} °C`}</TableCell>
                        <TableCell>{summary}</TableCell>
                        <TableCell>{`${windSpeed} m/s`}</TableCell>
                      </TableRow>
                    ) : null;
                  })
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {coordinates.latitude !== 0 ? (
        <Map latitude={coordinates.latitude} longitude={coordinates.longitude} place="MyPlace" />
      ) : null}
    </div>
  );
};

export default DayWeather;
