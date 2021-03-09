import { Calendar } from '../db/db';

export const addFav = async(body: any, user: any) => {
  const { title, subTitle, imgUrl, releaseDate } = body;
  const favItem = await Calendar.create({
    title: title,
    subTitle: subTitle,
    imgUrl: imgUrl,
    releaseDate: releaseDate
  });
  return favItem.save();
};

export const getFavs = () => {
  return Calendar.findAll();
};

export const removeFav = (body: any) => {
  const { id } = body;
  return Calendar.destroy({
    where: {
      id: id
    }
  });
};
