const router = require('express').Router();
const { Items } = require('../db/db');

router.route('/').post((req, res) => {
    return addItem(req.body, req.cookies)
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
  });

  module.exports = router;