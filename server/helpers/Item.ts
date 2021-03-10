import { Items } from '../db/db';

export const addItem = async(body: any): unknown => {
  const { clothingType, description, price, imageUrl } = body;
  const newItem = await Items.create({
    clothingType: clothingType,
    description: description,
    price: price,
    imageUrl: imageUrl
  });
  return newItem.save();
};

export const getAllItems = (): void => {
  return Items.findAll();
};

export const deleteItem = (body: any): void => {
  const { id } = body;
  return Items.destroy({
    where: {
      id: id
    }
  });
};

