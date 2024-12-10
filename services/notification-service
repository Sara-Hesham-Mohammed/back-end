const Notification = require('../models/Notification');

const createNotification = async (recipientId, senderId, postId, type, message) => {
  try {
    const notification = new Notification({
      recipient: recipientId,
      sender: senderId,
      post: postId,
      type,
      message,
    });
    await notification.save();
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error.message);
    throw new Error('Failed to create notification');
  }
};

const getNotifications = async (userId) => {
  try {
    return await Notification.find({ recipient: userId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('sender', 'username')
      .populate('post', 'caption');
  } catch (error) {
    console.error('Error fetching notifications:', error.message);
    throw new Error('Failed to fetch notifications');
  }
};

module.exports = { createNotification, getNotifications };
