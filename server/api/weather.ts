import { Router } from 'express';
const Weather = Router();
import { getWeatherByGeoLocation } from '../helpers/weather';

Weather.post('/', (req, res) => {
  const { latitude, longitude } = req.body;

  getWeatherByGeoLocation(latitude, longitude)
    .then((data: any) => res.json(data))
    .catch((err: any) => console.warn(err));
});

module.exports = {
  Weather,
};


