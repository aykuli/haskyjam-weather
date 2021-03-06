/* eslint-disable no-useless-computed-key */
import React from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import { ReactDadata } from 'react-dadata';
import { ButtonGroup, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, fade, Theme, createStyles } from '@material-ui/core/styles';

import { NAVBAR_BTNS, SEARCH_PLACEHOLDER } from '../constantas/common';
import { DADATA } from '../constantas/api-keys';

import { Coordinates, DadataSuggestion } from '../types';

import { changeCurrentTab as changeTab, refreshCoordinates } from '../redux/actions';
import { forwardGeocoding } from '../services/opencagedata';

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
      ['@media (max-width: 624px)']: {
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
      ['@media (max-width: 624px)']: {
        marginBottom: 10,
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      top: 0,
      left: -40,
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      minWidth: 250,
      width: '100%',
      color: theme.palette.text.primary,
    },
  })
);

interface MapStateProps {
  currentTab: string;
}

interface DispatchProps {
  setCoordinates: (data: Coordinates) => void;
  changeCurrentTab: (newTab: string) => void;
}

type AppProps = MapStateProps & DispatchProps;

const Navbar = (props: AppProps) => {
  const { changeCurrentTab, currentTab, setCoordinates } = props;

  const styles = useStyles();

  const handleTab = (
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    const { innerText } = e.target as HTMLButtonElement;
    changeCurrentTab(innerText);
  };

  const handleSearch = (e: DadataSuggestion) => {
    console.log('e: ', e);
    const { city, settlement, area } = e.data;
    let place;
    if (city) {
      place = city;
    } else if (settlement) {
      place = settlement;
    } else {
      place = area;
    }
    forwardGeocoding(place).then((data) => {
      const coordinates = data.results[0].geometry;
      setCoordinates({ latitude: coordinates.lat, longitude: coordinates.lng });
    });
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
        <div className={styles.inputRoot}>
          <ReactDadata
            token={DADATA}
            query=""
            autoload
            placeholder={SEARCH_PLACEHOLDER}
            onChange={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootStateOrAny) => ({
  currentTab: state.currentTab,
});

const mapDispatchToProps = {
  changeCurrentTab: (newTab: string) => changeTab(newTab),
  setCoordinates: (data: Coordinates) => refreshCoordinates(data),
};

export default connect<MapStateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Navbar);
