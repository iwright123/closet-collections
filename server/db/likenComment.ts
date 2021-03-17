import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/3001', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We Are Open For Business');
});
const commentSchema = new mongoose.Schema({
  outfitID: Number,
  name: String,
  text: String,
});
const likeSchema = new mongoose.Schema({
  name: String,
  outfitId: Number
});
export const Like = mongoose.model('Like', likeSchema);
export const Comment = mongoose.model('Comment', commentSchema);
