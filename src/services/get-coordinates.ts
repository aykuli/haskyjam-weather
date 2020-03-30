import { IP_INFO_KEY } from '../constantas/api-keys';

const getCoordinates = async () => {
  const response = await fetch(`https://ipinfo.io?token=${IP_INFO_KEY}`);
  const data = await response.json();
  const { city, country } = data;
  const [lat, lng] = data.loc.split(',');
  return {
    latitude: Number(lat),
    longitude: Number(lng),
    city,
    country,
  };
};

export default getCoordinates;
