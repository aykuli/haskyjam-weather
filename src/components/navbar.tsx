import React from 'react';
import { AppBar, Toolbar, InputBase, ButtonGroup, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, fade, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      height: 64,
      backgroundColor: theme.palette.primary.main,
      padding: '0 10px 10px',
    },
    activeTab: {
      backgroundColor: theme.palette.primary.dark,
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
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  })
);
function ResponsiveDrawer() {
  const [currentTab, setCurrentTab] = React.useState('today');

  const styles = useStyles();

  const handleTab = (e: any) => {
    console.log('e: ', e.target.innerText);
  };
  const btns = ['today', 'tomorrow', 'week'];
  // TODO переключать, если погода сегодняшняя - подсветить
  return (
    <div className={styles.root}>
      <ButtonGroup
        size="large"
        color="secondary"
        aria-label="wheather for today, tomorrow or for week"
      >
        {btns.map((btn) => (
          <Button key={btn} onClick={handleTab}>
            {btn}
          </Button>
        ))}
      </ButtonGroup>
      <div className={styles.search}>
        <div className={styles.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: styles.inputRoot,
            input: styles.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
    </div>
  );
}

export default ResponsiveDrawer;
