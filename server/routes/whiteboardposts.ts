import { Router } from 'express';
const WhiteboardPost = Router();

import { addFavOutfit, getFavOutfit } from '../helpers/WhiteBoardPost';

export default WhiteboardPost.get('/get', (req, res) => {
  return getFavOutfit(req.cookies.thesis)
    .then((data) => res.send(data))
    .catch((err) => console.warn(err));
});

WhiteboardPost.post('/', (req, res) => {
  return addFavOutfit(req.body, req.cookies.thesis)
    .then((data) => res.send(data))
    .catch((err) => console.warn(err));
});
