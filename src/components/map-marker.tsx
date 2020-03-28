import React, { useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import RoomIcon from '@material-ui/icons/Room';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

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

interface MarkerProps {
  latitude: number;
  longitude: number;
  // place: string;
}

const MapMarker: React.FC<MarkerProps> = ({
  latitude,
  longitude,
  //   info,
}) => {
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
            <Typography variant="body1">city:</Typography>
            <Typography variant="body1">country:</Typography>
          </div>
        </Popup>
      )}
    </>
  );
};

export default MapMarker;
