import { Outfit } from '../db/db';

export const saveOutfit = async(body: any, user: any) => {
  const { imageUrl }= body;
  const newOutfit = await Outfit.create({
    user: user,
    imageUrl: imageUrl
  });
  return newOutfit.save();
};

export const getAllOutfits = () => {
  return Outfit.findAll();
}

export const getUserOutfits = (user) => {
  return Outfit.findAll({
    where: {user: user}
  });
}
export const deleteOutfit = (body: any) => {
  const { id } = body;
  return Outfit.destroy({
    where: {
      id: id
    }
  });
};