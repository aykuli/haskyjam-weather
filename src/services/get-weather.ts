import { OPEN_WEATHER_KEY } from '../constantas/api-keys';

const getWeather = async (latitude: number, longitude: number, lang: string) => {
  const units = 'metric';

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${OPEN_WEATHER_KEY}&lang=${lang}&units=${units}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log('data: ', data);
  return 0;
  //   return {
  //     data,
  //   };
};

export default getWeather;
