
const { Items } = require('../db/db');

const addItem = async(body) => {
  const { clothingType, description, price, imageUrl } = body;
  console.log('LOOK HERE LINE 5.....', body);
  const newItem = await Items.create({
    clothingType: clothingType,
    description: description,
    price: price,
    imageUrl: imageUrl
  });
  return newItem.save();
};

const getAllItems = () => {
  return Items.findAll();
};

module.exports = {
  addItem,
  getAllItems
};