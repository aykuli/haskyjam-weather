/* eslint-disable @typescript-eslint/no-unused-vars */
import { OPEN_WEATHER_KEY, DARKSKY_KEY } from '../constantas/api-keys';

interface RequestCors {
  type: string;
}

const getWeatherByCoordinates = async (latitude: number, longitude: number, lang: string) => {
  // try to fetcj to opencagedata. Work bad
  // const units = 'metric';
  // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${OPEN_WEATHER_KEY}&lang=${lang}&units=${units}`;
  // const response = await fetch(url);

  const unit = 'si';
  const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${DARKSKY_KEY}/${latitude},${longitude}?lang=${lang}&units=${unit}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default getWeatherByCoordinates;
