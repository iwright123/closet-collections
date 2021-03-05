import Router from 'express';
const Find = Router();
import { findAStore } from '../helpers/findAStore';

export default Find.get('/', (req, res) => {
  const { keyword } = req.query;

  findAStore(keyword)
    .then((data) => res.status(200).json(data))
    .catch(() => console.error(404));
});