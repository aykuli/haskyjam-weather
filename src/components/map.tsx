import React, { useState } from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import MapGL, { FlyToInterpolator, GeolocateControl, ScaleControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { easeCubic } from 'd3-ease';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import MapMarker from './map-marker';

import { MAPBOX_TOKEN } from '../constantas/api-keys';
import { addCityToHistory } from '../redux/actions';
import { HistoryItem, Coordinates } from '../types';

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    position: 'relative',
    marginTop: 'auto',
    width: 'calc(100% - 420px)',
    textAlign: 'right',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  mapControllers: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 2,
    boxShadow: theme.shadows[2],
  },
  btnGroupAndTheme: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    backgroundColor: theme.palette.background.default,
  },
  fullscreenControl: {
    position: 'absolute',
    bottom: 40,
    right: 10,
  },
  scaler: {
    position: 'absolute',
    bottom: 16,
    right: 10,
  },
  modalWrap: {
    width: '100vw',
    backgroundColor: 'blue',
  },
  geolocateStyle: {
    position: 'absolute',
    bottom: 40,
    right: 10,
  },
}));

interface MapStateProps {
  coordinates: Coordinates;
}

interface DispatchProps {
  setNewCityToHistory: (history: HistoryItem) => void;
}

type Props = MapStateProps & DispatchProps;

const Map = (props: Props) => {
  const { coordinates } = props;
  const { latitude, longitude } = coordinates;
  const styles = useStyles();
  const [viewport, setViewport] = useState({
    width: 650,
    height: 400,
    latitude,
    longitude,
    zoom: 7,
    bearing: 0,
    pitch: 0,
  });
  const mapTheme = 'streets-v11';

  const gotoCurrentPlace = () => {
    const viewportCurrent = {
      ...viewport,
      longitude,
      latitude,
      zoom: 13,
      transitionDuration: 'auto',
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic,
    };
    setViewport(viewportCurrent);
  };

  return (
    <>
      <div id="map-container" className={styles.mapContainer}>
        <Button
          onClick={gotoCurrentPlace}
          aria-label="Back to current place"
          variant="contained"
          color="primary"
          size="small"
        >
          Back to current place
        </Button>
        <MapGL
          {...viewport}
          onViewportChange={setViewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle={`mapbox://styles/mapbox/${mapTheme}`}
          attributionControl
          width="100%"
        >
          <MapMarker />
          <div className={styles.scaler}>
            <ScaleControl maxWidth={100} unit="metric" />
          </div>
          <GeolocateControl
            className={styles.geolocateStyle}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation
          />
        </MapGL>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootStateOrAny) => ({
  coordinates: state.coordinates,
});

const mapDispatchToProps = {
  setNewCityToHistory: (history: HistoryItem) => addCityToHistory(history),
};

export default connect<MapStateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Map);
