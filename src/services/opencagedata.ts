import { OPENCAGEDATA_KEY } from '../constantas/api-keys';

async function forwardGeocoding(settlement: string, lang = 'ru') {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${settlement}&countrycode=${lang}&key=${OPENCAGEDATA_KEY}&language=${lang}&pretty=1&no_annotations=1`;
  const headers: any = { 'Content-Type': 'application/json' };

  const response = await fetch(url, headers);
  return response.json();
}

async function reverseGeocoding(latitude: number, longitude: number, lang = 'ru') {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=${OPENCAGEDATA_KEY}&language=${lang}&pretty=1`;
  const response = await fetch(url);
  return response.json();
}

export { forwardGeocoding, reverseGeocoding };
