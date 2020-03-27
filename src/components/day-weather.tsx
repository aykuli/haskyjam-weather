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
    justifyContent: 'space-between',
    padding: '10px 10px 40px',
  },
  info: {
    // border: '1px solid red',
  },
  table: {
    minWidth: 250,
  },
  headRow: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.light,
  },
}));

interface DayInfo {
  title: string;
  data: any;
}

const DayWeather: React.FC<DayInfo> = ({ title, data }) => {
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
                    const isRender =
                      level === timeConverted.getDate() && timeConverted.getHours() % 3 === 0;

                    return isRender ? (
                      <TableRow key={item.time}>
                        <TableCell component="th" scope="row">
                          {`${timeConverted.getHours()}: ${timeConverted.getMinutes()}0`}
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
      <Map latitude={50} longitude={82} place="MyPlace" />
    </div>
  );
};

export default DayWeather;
