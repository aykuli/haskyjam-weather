import React from 'react';

import getCoordinates from './services/get-coordinates';

function App() {
  // const [coordinates, setCoordinates] = useState({});
  // console.log('coordinates: ', coordinates);
  // getCoordinates().then(data=> {
  //       console.log(data);
  //       setCoordinates(data);
  //   });
  //   useEffect(()=> {
  //     getCoordinates().then(data => {
  //     console.log(data);
  //     setCoordinates(data);
  //   });
  // }, [])

  console.log('getCoordinates: ', getCoordinates());
  return (
    <div>
      <header>Hello</header>
      {/* {coordinates.latitude === 0 ? null : (
      <div>
        <span>{coordinates.latitude}, </span>
        <span>{coordinates.longitude}</span>
      </div>
      )} */}
    </div>
  );
}

// TODO env-cmd разобраться что за модуль
// TODO typescript in devDependencies

export default App;
