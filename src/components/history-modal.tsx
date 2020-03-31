import React from 'react';
import { Modal, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import HistoryTable from './history-table';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    outline: 'none',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
interface Props {
  isOpen: boolean;
  hideHistory: () => void;
}

const HistoryModal = (props: Props) => {
  console.log('props: ', props);
  const { isOpen, hideHistory } = props;
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="History of cities"
      aria-describedby="where user have been"
      open={isOpen}
      onClose={hideHistory}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className={classes.modal}
    >
      <div>
        <HistoryTable />
      </div>
    </Modal>
  );
};
export default HistoryModal;
