import { WhiteboardPost } from '../db/db';
/* eslint-disable-next-line */
export const savePost = async (body: any) => {
  const { likes, dislikes, comments } = body;
  const newPost = await WhiteboardPost.create({
    likes: likes,
    dislikes: dislikes,
    comments: comments
  });
  return newPost.save();
};
/* eslint-disable-next-line */
export const getAllWhiteboardPosts = (): any => {
  return WhiteboardPost.findAll();
};

export const addFavOutfit = async(body: {
  idUser: number,
  likes: boolean,
  comments: string
}, user: unknown): Promise<any> => {
  const idUser = body.idUser;
  const likes = body.likes;
  const comments = body.comments;

  const favOutfit = await WhiteboardPost.create({
    user: user,
    likes: likes,
    comments: comments,
    idUser: idUser
  });
  return favOutfit.save();
};

export const getFavOutfit = (user: number): Promise<any> => {
  return WhiteboardPost.findAll({
    where: {user: user}
  });
};
