import { Outfit } from '../db/db';

export const saveOutfit = async(body: unknown, user: string): Promise<unknown> => {
  const { imageUrl } = body;
  const newOutfit = await Outfit.create({
    user: user,
    imageUrl: imageUrl
  });
  return newOutfit.save();
};

export const getAllOutfits = (): void => {
  return Outfit.findAll();
};

export const getUserOutfits = (user: number): void => {
  return Outfit.findAll({
    where: {user: user}
  });
};
export const deleteOutfit = (body: number): void => {
  const { id } = body;
  return Outfit.destroy({
    where: {
      id: id
    }
  });
};
