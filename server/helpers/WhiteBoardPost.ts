import { WhiteboardPost } from '../db/db';

export const savePost = async(body: any) => {
  const { likes, dislikes, comments } = body;
  const newPost = await WhiteboardPost.create({
    likes: likes,
    dislikes: dislikes,
    comments: comments
  });
  return newPost.save();
};

export const getAllWhiteboardPosts = () => {
  return WhiteboardPost.findAll();
}

export const updateLike = (body: any) => {
  const { likes } = body;
  return WhiteboardPost.findOneAndUpdate({
    likes: likes
  })
}
//count liked posts
// export const countLikes = WhiteboardPost.findAll({
//   attributes: {
//     include: [[Sequelize.fn("COUNT", Sequelize.col("whiteboardpost.outfitid")), "sensorCount"]]
//   }
// })
