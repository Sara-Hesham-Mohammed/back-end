const {Schema, model} = require('mongoose');

const NotificationSchema = new Schema(
  {
    recipient: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    sender: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    post: { 
        type: Schema.Types.ObjectId, 
        ref: 'Post', 
        required: true 
    },
    type: { 
        type: String, 
        enum: ['like', 'comment'], 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    isRead: { 
        type: Boolean, 
        default: false 
    },
  },
  { timestamps: true }
);

module.exports = model('Notification', NotificationSchema);
