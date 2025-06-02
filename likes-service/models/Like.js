const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  postId: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Like', LikeSchema);
