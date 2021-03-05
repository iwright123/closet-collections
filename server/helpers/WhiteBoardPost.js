const { WhiteboardPost } = require('../db/db');

const savePost = async(body) => {
  const { likes, dislikes, comments } = body;
  const newPost = await WhiteboardPost.findOrCreate({
    likes: likes,
    dislikes: dislikes,
    comments: comments
  });
  return newPost.save();
};

module.exports = {
  savePost
};