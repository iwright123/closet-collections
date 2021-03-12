import { Outfit } from '../db/db';

export const saveOutfit = async(body: any, user: string): Promise<any> => {
  const { imageUrl } = body;
  const newOutfit = await Outfit.create({
    user: user,
    imageUrl: imageUrl
  });
  return newOutfit.save();
};

export const getAllOutfits = (): Promise<any> => {
  return Outfit.findAll();
};

export const getUserOutfits = (user: number): Promise<any> => {
  return Outfit.findAll({
    where: {user: user}
  });
};
export const deleteOutfit = (body: any): Promise<any> => {
  const { id } = body;
  return Outfit.destroy({
    where: {
      id: id
    }
  });
};
