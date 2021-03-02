const { Router } = require('express');
const { Items } = require('../db/db');
const { addItem } = require('../helpers/addItem');

const Item = Router();

Item.get('/', (req, res) => {

});
Item.post('/', (req, res) => {
  console.log('LOOOOK HERREEEE LINE SEVEN', req);
  return addItem(req.body)
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});

module.exports = Item;