import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 40,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    zIndex: 5,
  },
  msgWrap: {
    flexGrow: 0,
    minWidth: 200,
    minHeight: 50,
    padding: 20,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: 7,
    opacity: 0.8,
  },
}));

interface PopupMessageProps {
  msg: string;
}

const PopupMessage: React.FC<PopupMessageProps> = ({ msg }) => {
  const styles = useStyles();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.msgWrap}>{msg}</div>
      </div>
    </>
  );
};

export default PopupMessage;
