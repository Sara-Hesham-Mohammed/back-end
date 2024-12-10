const Repost = require('../models/Repost');
const { createNotification } = require('./notification-service');

// Create a new repost
const createRepost = async (authorId, caption, article) => {
  try {
    const repost = new Repost({
      author: authorId,
      caption,
      article, // Include article details
    });

    await repost.save();
    return repost;
  } catch (error) {
    console.error('Error creating repost:', error);
    throw new Error('Failed to create repost');
  }
};

// Fetch reposts for a user's feed
const fetchFeedReposts = async (userIds) => {
  try {
    const reposts = await Repost.find({ author: { $in: userIds } })
      .sort({ createdAt: -1 })
      .populate('author', 'username'); // Optionally populate author details (e.g., username)
    return reposts;
  } catch (error) {
    console.error('Error fetching feed reposts:', error);
    throw new Error('Failed to fetch feed reposts');
  }
};

const likeRepost = async (repostId, userId) => {
  try {
    const repost = await Repost.findById(repostId);

    if (!repost) {
      throw new Error('Repost not found');
    }

    const likeIndex = repost.likes.indexOf(userId);

    if (likeIndex === -1) {
      // Add a like
      repost.likes.push(userId);
      
      // Send a notification to the repost author
      if (repost.author.toString() !== userId) {
        await createNotification(
          repost.author,
          userId,
          repostId,
          'like',
          'liked your repost'
        );
      }
    } else {
      // Remove the like
      repost.likes.splice(likeIndex, 1);
    }

    await repost.save();
    return repost;
  } catch (error) {
    console.error('Error toggling like on repost:', error.message);
    throw new Error('Failed to toggle like on repost');
  }
};


// Add a comment to a repost
const commentOnRepost = async (repostId, userId, text) => {
  try {
    const repost = await Repost.findById(repostId);

    const comment = {
      commenter: userId,
      text,
      createdAt: new Date(),
    };

    repost.comments.push(comment);
    await repost.save();

    // Send a notification to the repost author
    if (repost.author.toString() !== userId) {
      await createNotification(
        repost.author,
        userId,
        repostId,
        'comment',
        'commented on your repost'
      );
    }

    return repost;
  } catch (error) {
    console.error('Error commenting on repost:', error.message);
    throw new Error('Failed to comment on repost');
  }
};

// Fetch likes and comments for a repost
const getRepostInteractions = async (repostId) => {
  try {
    const repost = await Repost.findById(repostId)
      .populate('likes', 'username') // Populate the users who liked
      .populate('comments.commenter', 'username'); // Populate the commenters

    if (!repost) {
      throw new Error('Repost not found');
    }

    return {
      likes: repost.likes,
      comments: repost.comments,
    };
  } catch (error) {
    console.error('Error fetching repost interactions:', error.message);
    throw new Error('Failed to fetch repost interactions');
  }
};

module.exports = { createRepost,
  fetchFeedReposts,
  likeRepost,
  commentOnRepost,
  getRepostInteractions, 
};
