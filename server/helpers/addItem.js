
const { Items } = require('../db/db');

const addItem = async (body) => {
  const { clothingType, description, price } = body;
  console.log('LOOK HERE LINE 5.....', body);
  const newItem = await Items.create({
    clothingType: clothingType,
    description: description,
    price: price
  });
  return newItem.save();
};

module.exports = {
  addItem
};