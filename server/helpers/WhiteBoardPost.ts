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

export const updateLike = (body: any):any => {
  const { likes } = body;
  console.log('line 20', body);
  return WhiteboardPost.findOneAndUpdate({
    likes: likes
  });
};
//count liked posts
// export const countLikes = WhiteboardPost.findAll({
//   attributes: {
//     include: [[Sequelize.fn("COUNT", Sequelize.col("whiteboardpost.outfitid")), "sensorCount"]]
//   }
// })
