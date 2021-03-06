import { Outfit } from '../db/db';

export const saveOutfit = async(body: any) => {
  const { imageUrl }= body;
  const newOutfit = await Outfit.create({
    imageUrl: imageUrl
  });
  return newOutfit.save();
};

export const getAllOutfits = () => {
  return Outfit.findAll();
}

export const deleteOutfit = (body: any) => {
  const { id } = body;
  return Outfit.destroy({
    where: {
      id: id
    }
  });
};