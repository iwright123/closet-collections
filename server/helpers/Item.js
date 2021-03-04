
const { Items } = require('../db/db');

const addItem = async(body) => {
  const { clothingType, description, price, imageUrl } = body;
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

const deleteItem = (body) => {
  const { id } = body;
  return Items.destroy({
    where: {
      id: id
    }
  });
};

module.exports = {
  addItem,
  getAllItems,
  deleteItem
};