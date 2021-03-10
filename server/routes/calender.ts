import { Router } from 'express';
const CalendarItem = Router();

import { addFav, getFavs, removeFav } from '../helpers/calendar';

CalendarItem.get('/get', (req, res) => {
  return getFavs()
    .then((data: any) => res.send(data))
    .catch((err: string) => console.warn(err));
});

CalendarItem.post('/', (req, res) => {
  return addFav(req.body)
    .then((data: any) => res.send(data))
    .catch((err: string) => console.warn(err));
});

CalendarItem.delete('/', (req: any, res: any) => {
  return removeFav(req.body)
    .then((data: any) => res.send(data))
    .catch((err: string) => console.warn(err));
});

module.exports = CalendarItem;
