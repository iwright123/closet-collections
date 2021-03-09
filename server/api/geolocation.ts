import { Router } from 'express';
const Location = Router();
import { getGeolocationByIP } from '../helpers/geolocation';

Location.post('/', (req, res) => {
  const { ip } = req.body;

  return getGeolocationByIP(ip)
    .then((data) => res.status(200).send(data))
    .catch(() => res.status(404));
});

module.exports = {
  Location,
};
