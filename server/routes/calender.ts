import { Router } from 'express';
const CalendarItem = Router();

import { addFav, getFavs, removeFav } from '../helpers/calendar';

export const getFavorite = CalendarItem.get('/get', (req, res) => {
  return getFavs(req.cookies.thesis)
    .then((data) => res.send(data))
    .catch((err) => console.warn(err));
});

export const addFavorite = CalendarItem.post('/', (req, res) => {
  return addFav(req.body, req.cookies.thesis)
    .then((data) => res.send(data))
    .catch((err) => console.warn(err));
});

export const removeFavorite = CalendarItem.delete('/', (req, res) => {
  return removeFav(req.body)
    .then((data) => res.send(data))
    .catch((err) => console.warn(err));
});

export default { getFavorite, addFavorite, removeFavorite};
