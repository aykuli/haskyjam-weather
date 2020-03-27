/* eslint-disable no-useless-computed-key */
import React from 'react';
import { InputBase, ButtonGroup, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, fade, Theme, createStyles } from '@material-ui/core/styles';

import { NAVBAR_BTNS } from '../constantas/common';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      backgroundColor: theme.palette.primary.main,
      padding: '10px 40px',
    },
    activeTab: {
      backgroundColor: theme.palette.primary.dark,
    },
    btnGroup: {
      ['@media (max-width: 600px)']: {
        marginBottom: 20,
        margin: 'auto',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
      ['@media (max-width:600px)']: {
        marginBottom: 10,
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      minWidth: 250,
      width: '100%',
      color: theme.palette.primary.contrastText,
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '25ch',
        },
      },
    },
  })
);

const Navbar = () => {
  const [currentTab, setCurrentTab] = React.useState('TODAY');

  const styles = useStyles();

  const handleTab = (
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    const { innerText } = e.target as HTMLButtonElement;
    setCurrentTab(innerText);
  };

  return (
    <div className={styles.root}>
      <ButtonGroup
        size="large"
        color="secondary"
        aria-label="wheather for today, tomorrow or for week"
        className={styles.btnGroup}
      >
        {NAVBAR_BTNS.map((btn) => {
          return (
            <Button
              key={btn}
              onClick={handleTab}
              className={btn === currentTab ? styles.activeTab : ''}
            >
              {btn}
            </Button>
          );
        })}
      </ButtonGroup>
      <div className={styles.search}>
        <div className={styles.searchIcon}>
          <SearchIcon color="secondary" />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: styles.inputRoot,
            input: styles.inputInput,
          }}
          inputProps={{ 'aria-label': 'search city' }}
        />
      </div>
    </div>
  );
};

export default Navbar;
