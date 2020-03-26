import React, { useState, useEffect } from 'react';

import getCoordinates from './services/get-coordinates';

function App() {
  const [placeInfo, setPlaceInfo] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    getCoordinates().then((data) => {
      setPlaceInfo(data);
    });
  }, []);

  return (
    <div>
      <header>Hello</header>
      {placeInfo.latitude === 0 ? null : (
        <div>
          <span>{placeInfo.latitude}</span>
          <span>{placeInfo.longitude}</span>
        </div>
      )}
    </div>
  );
}

// TODO env-cmd разобраться что за модуль
// TODO typescript in devDependencies

export default App;
