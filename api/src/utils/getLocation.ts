import 'dotenv/config';

import CustomError from '../models/customError.js';

const getLocation = async (address: string) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
  );

  const data = await response.json();

  if (!data || data.status === 'ZERO_RESULTS') {
    throw new CustomError('Could not find location for given address', 422);
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
};

export default getLocation;
