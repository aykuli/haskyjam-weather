import React from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import { Table, IconButton, Tooltip } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';

import { clearHistory } from '../redux/actions';
import { HistoryItem } from '../types';

interface Data {
  city: string;
  latitude: number;
  longitude: number;
}

interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'city', numeric: false, label: 'Населенный пункт' },
  { id: 'latitude', numeric: true, label: 'Ширина' },
  { id: 'longitude', numeric: true, label: 'Долгота' },
];

const EnhancedTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.numeric ? 'right' : 'left'}>
            {' '}
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  })
);

interface TableToolbarProps {
  setEmptyHistory: () => void;
}

const EnhancedTableToolbar: React.FC<TableToolbarProps> = ({ setEmptyHistory }) => {
  const classes = useToolbarStyles();
  return (
    <Toolbar className={classes.highlight}>
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        Сохраненные города
      </Typography>
      <Tooltip title="Clear history">
        <IconButton aria-label="delete" onClick={() => setEmptyHistory()}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      padding: '20px 0 40px',
    },
    table: {
      padding: 20,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  })
);

interface StateProps {
  history: Array<HistoryItem>;
}

interface DispatchProps {
  setEmptyHistory: () => void;
}

type HistoryTableProps = StateProps & DispatchProps;

const HistoryTable: React.FC<HistoryTableProps> = (props) => {
  const { history, setEmptyHistory } = props;
  const showHistory = history.slice().reverse();

  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, showHistory.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar setEmptyHistory={setEmptyHistory} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead />
            <TableBody>
              {showHistory
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const { id, city, coordinates } = row;
                  const { latitude, longitude } = coordinates;
                  const fixedLat = latitude ? latitude.toFixed(2) : null;
                  const fixedLng = longitude ? longitude.toFixed(2) : null;
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                      <TableCell align="left">{city}</TableCell>
                      <TableCell align="right">{fixedLat}</TableCell>
                      <TableCell align="right">{fixedLng}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={showHistory.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

const mapStateToProps = (state: RootStateOrAny) => ({
  history: state.history,
});

const mapDispatchToProps = {
  setEmptyHistory: () => clearHistory(),
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(HistoryTable);
