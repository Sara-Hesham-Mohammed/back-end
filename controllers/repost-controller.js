const { createRepost, likeRepost, commentOnRepost } = require('../services/repost-service');

// Create a new repost
const createRepostController = async (req, res) => {
  try {
    const { caption, article } = req.body;

    // Validate that article contains the necessary fields
    if (!article || !article.title || !article.url || !article.source) {
      return res.status(400).send({ message: 'Invalid article details' });
    }

    // Create the repost
    const repost = await createRepost(req.user.id, caption, article);
    res.status(201).send(repost);
  } catch (err) {
    console.error('Error creating repost:', err);
    res.status(500).send({ message: err.message });
  }
};

// Like or unlike a repost
const likeRepostController = async (req, res) => {
  try {
    const { repostId } = req.params;

    // Toggle like on the repost
    const updatedRepost = await likeRepost(repostId, req.user.id);
    res.status(200).send(updatedRepost);
  } catch (err) {
    console.error('Error liking/unliking repost:', err);
    res.status(500).send({ message: err.message });
  }
};

// Add a comment to a repost
const commentOnRepostController = async (req, res) => {
  try {
    const { repostId } = req.params;
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).send({ message: 'Comment text cannot be empty' });
    }

    // Add the comment to the repost
    const updatedRepost = await commentOnRepost(repostId, req.user.id, text.trim());
    res.status(201).send(updatedRepost);
  } catch (err) {
    console.error('Error commenting on repost:', err);
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  createRepostController,
  likeRepostController,
  commentOnRepostController,
};
