import { Items } from '../db/db';

export const addItem = async(body: any): Promise<any> => {
  const { clothingType, description, price, imageUrl } = body;
  const newItem = await Items.create({
    clothingType: clothingType,
    description: description,
    price: price,
    imageUrl: imageUrl
  });
  return newItem.save();
};

export const getAllItems = (): Promise<any> => {
  return Items.findAll();
};

export const deleteItem = (body: any): Promise<any> => {
  const { id } = body;
  return Items.destroy({
    where: {
      id: id
    }
  });
};

