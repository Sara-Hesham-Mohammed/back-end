const express = require('express');
const router = express.Router();
const NewsPost = require('../models/NewsPost');

// Repost endpoint
router.post('/:id/repost', async (req, res) => {
  const { userId, caption } = req.body;
  try {
    const post = await NewsPost.findById(req.params.id);
    post.reposts.push({ userId, caption });
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Like endpoint
router.post('/:id/like', async (req, res) => {
  const { userId } = req.body;
  try {
    const post = await NewsPost.findById(req.params.id);
    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
    } else {
      post.likes = post.likes.filter((id) => id !== userId); // Toggle like
    }
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Comment endpoint
router.post('/:id/comment', async (req, res) => {
  const { userId, text } = req.body;
  try {
    const post = await NewsPost.findById(req.params.id);
    post.comments.push({ userId, text });
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
