import React, { useState } from 'react';
import MapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { makeStyles } from '@material-ui/core/styles';

import MapMarker from './map-marker';

import { MAPBOX_TOKEN } from '../constantas/api-keys';

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    position: 'relative',
    marginTop: 'auto',
    width: 'calc(100% - 420px)',
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
  scaler: { position: 'absolute', bottom: 16, right: 35 },
  modalWrap: {
    width: '100vw',
    backgroundColor: 'blue',
  },
  geolocateStyle: {
    position: 'absolute',
    bottom: 80,
    right: 10,
  },
}));

interface MapProps {
  latitude: number;
  longitude: number;
  place: string;
}

const Map: React.FC<MapProps> = ({ latitude, longitude, place }) => {
  console.log(latitude);
  console.log(longitude);
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

  return (
    <>
      <div id="map-container" className={styles.mapContainer}>
        <MapGL
          {...viewport}
          onViewportChange={setViewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle={`mapbox://styles/mapbox/${mapTheme}`}
          attributionControl
          width="100%"
        >
          <MapMarker latitude={latitude} longitude={longitude} />
        </MapGL>
      </div>
    </>
  );
};

export default Map;
