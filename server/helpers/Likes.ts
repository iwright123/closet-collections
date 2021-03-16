import { Likes } from '../db/db';

export const saveLikes = async(body: any, user: any): Promise<any> => {
  const { outfitId } = body;
  const newLike = await Likes.create({
    oufitId: outfitId,
    user: user,
    favorite: true
  });
  return newLike.save();
};

export const getLikes = (user: any): Promise<any> => {
  return Likes.findAll({
    where: {
      user: user
    }
  });

};
