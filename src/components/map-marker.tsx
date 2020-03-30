import React, { useState } from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import { Marker, Popup } from 'react-map-gl';
import RoomIcon from '@material-ui/icons/Room';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { HistoryItem, Coordinates } from '../types';
import { addCityToHistory } from '../redux/actions';

const useStyles = makeStyles((theme: Theme) => ({
  marker: {
    transform: 'translate(0, 0)',
    // color: theme.palette.primary.main,
  },
  user: {
    position: 'relative',
    cursor: 'pointer',
    outline: 'none',
    '& svg': {
      fill: theme.palette.error.dark,
    },
  },
  popup: {
    maxWidth: '70%',
    transform: 'none',

    '& h2': {
      margin: '0 0 10px 0',
    },
    '& p': {
      margin: 0,
    },
    '& .mapboxgl-popup-content': {
      minWidth: 50,
      boxShadow: '2px 2px 10px rgba(0, 0, 0, .53)',
    },
  },
}));

interface MapStateProps {
  temperatureCurrent: number | null;
  coordinates: Coordinates;
  city: string;
  country: string;
}

interface DispatchProps {
  setNewCityToHistory: (history: HistoryItem) => void;
}

type Props = MapStateProps & DispatchProps;

const MapMarker = (props: Props) => {
  const { coordinates, temperatureCurrent, city, country } = props;
  const { latitude, longitude } = coordinates;

  const [isShowPopup, setIsShowPopup] = useState(false);

  const styles = useStyles();

  return (
    <>
      <div
        className={styles.user}
        onClick={() => setIsShowPopup(!isShowPopup)}
        onKeyDown={() => setIsShowPopup(!isShowPopup)}
        role="button"
        tabIndex={0}
      >
        <Marker longitude={longitude} latitude={latitude} offsetLeft={-13} offsetTop={5}>
          <RoomIcon />
        </Marker>
      </div>
      {isShowPopup && (
        <Popup
          offsetLeft={0}
          offsetTop={27}
          latitude={latitude}
          longitude={longitude}
          onClose={() => setIsShowPopup(false)}
          closeOnClick={false}
          closeButton
          anchor="left"
          className={styles.popup}
        >
          <div>
            <Typography variant="h3" component="p">{`${temperatureCurrent} °C`}</Typography>
            <Typography variant="body2">{`${city}, ${country}`}</Typography>
          </div>
        </Popup>
      )}
    </>
  );
};
const mapStateToProps = (state: RootStateOrAny) => ({
  coordinates: state.coordinates,
  temperatureCurrent: state.temperature,
  city: state.city,
  country: state.country,
});

interface DispatchProps {
  setNewCityToHistory: (history: HistoryItem) => void;
}

const mapDispatchToProps = {
  setNewCityToHistory: (history: HistoryItem) => addCityToHistory(history),
};

export default connect<MapStateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(MapMarker);
