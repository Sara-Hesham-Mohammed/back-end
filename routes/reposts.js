const { Router } = require('express');
const { 
    createRepostController, 
    likeRepostController, 
    commentOnRepostController 
} = require('../controllers/repost-controller'); 

const repostsValidator = require('../validators/repost-validator');
const { validateRequest } = require('../middleware/validateRequest'); // Middleware to handle validation results

const repostsRouter = Router();

// Define the repost creation route
repostsRouter.post('/', repostsValidator.validateRepost(), validateRequest, createRepostController);
// Like or unlike a repost
repostsRouter.post('/:repostId/like', likeRepostController);

// Comment on a repost
repostsRouter.post('/:repostId/comment', commentOnRepostController);

module.exports = repostsRouter;

