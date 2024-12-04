//imports
const { Router } = require('express');
const newsController = require('../controllers/news-controller');
//init
const newsRouter = Router();

newsRouter.get('/', newsController.getAllNews);

newsRouter.post('/', newsController.postArticle);

//dynamic route /:id
newsRouter.get('/:articleId', newsController.getArticle);

newsRouter.delete('/:articleId', newsController.deleteArticle);

// export the router instance we created.
module.exports = newsRouter;
