// import Express Router from express
const { Router } = require('express');

// import our newsController
const newsController = require('../controllers/news-controller');

// create an instance of Express Router.
const newsRouter = Router();

// whenever we receive a GET request on products route '/',
// we will invoke the getProducts method in the products controller.
newsRouter.get('/', newsController.getAllNews);

// whenever we receive a POST request on products route '/',
// we will invoke the getProducts method in the products controller.
newsRouter.post('/', newsController.postArticle);

// whenever we receive a GET request on products DYNAMIC route '/:productId',
// we will invoke the getProduct method in the products controller that extracts the productId
newsRouter.get('/:articleId', newsController.getArticle);

newsRouter.delete('/:articleId', newsController.deleteArticle);

// export the router instance we created.
module.exports = newsRouter;
