const express = require('express');
const { followUser, unfollowUser, getFeed } = require('../controllers/userController');
const router = express.Router();

router.post('/follow/:id', followUser); // Follow a user
router.post('/unfollow/:id', unfollowUser); // Unfollow a user
router.get('/feed', getFeed); // Get the user's feed

module.exports = router;
