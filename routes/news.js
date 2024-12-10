//imports
const { Router } = require('express');
const newsController = require('../controllers/news-controller');
//init
const newsRouter = Router();

newsRouter.get('/top-headlines', newsController.getAllNews);

newsRouter.get('/:topic', newsController.getTopNewsByTopic);


//dynamic route /:id
newsRouter.get('/:articleId', newsController.getArticle);


// export the router instance we created.
module.exports = newsRouter;
