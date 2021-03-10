/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Calendar } from '../db/db';

export const addFav = async(body: unknown, user: unknown) => {
  const { title, subTitle, imgUrl, releaseDate } = body;
  const favItem = await Calendar.create({
    user: user,
    title: title,
    subTitle: subTitle,
    imgUrl: imgUrl,
    releaseDate: releaseDate
  });
  return favItem.save();
};

export const getFavs = (user: number): void => {
  return Calendar.findAll({
    where: {user: user}
  });
};

export const removeFav = (body: unknown): unknown => {
  const { id } = body;
  return Calendar.destroy({
    where: {
      id: id
    }
  });
};
