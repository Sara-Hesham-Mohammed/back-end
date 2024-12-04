const mongoose = require('mongoose');

const NewsPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String },
  reposts: [
    {
      caption: { type: String },
      userId: { type: String },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  likes: [{ type: String }], // Array of user IDs
  comments: [
    {
      userId: { type: String },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('NewsPost', NewsPostSchema);
