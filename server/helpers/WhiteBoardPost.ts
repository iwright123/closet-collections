const { WhiteboardPost } = require('../db/db');

export const savePost = async(body: any) => {
  const { likes, dislikes, comments } = body;
  const newPost = await WhiteboardPost.findOrCreate({
    likes: likes,
    dislikes: dislikes,
    comments: comments
  });
  return newPost.save();
};
