const {Schema, model} = require('mongoose');

const RepostSchema = new Schema({
  author: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  caption: { 
    type: String 
  },
  article: { 
    title: { type: String, required: true }, // Article title from the API
    url: { type: String, required: true }, // URL of the article
    source: { type: String, required: true }, // Source of the article
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  likes: [
    { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }], // Users who liked the post
    comments: [
      {
        commenter: { 
          type: Schema.Types.ObjectId, 
          ref: 'User' 
        },
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model('Repost', RepostSchema);

