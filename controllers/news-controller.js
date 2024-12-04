const newsService = require('../services/news-service');

//gets all news
module.exports.getAllNews = async (req, res) => {
  try {
    const news = await newsService.findAllNews();
    return res.send({ news });
  } catch (err) {
    // this denotes a server error, therefore status code should be 500.
    res.status(500);
    return res.send({
      error: err.message
    });
  }
};

//gets a single news article (maybe change to get article?)
module.exports.getArticle= async (req, res) => {
  // notice how we extract the articleId from the dynamic route that should be /news/:articleId
  const articleId = req.params.articleId;
  try {
    const article = await newsService.findArticleById(articleId);
    if (!article) {
      return res.status(404).send({
        error: 'article not found.'
      });
    }
    return res.send({
      article: article
    });
  } catch (err) {
    res.status(500).send({
      error: err.message
    });
  }
};

module.exports.postArticle = async (req, res) => {
  const articleInfo = {
  };
  try {
    const createdArticle = await newsService.addNewArticle(articleInfo);
    return res.status(201).send({
      msg: 'article created successfully.',
      articleId: createdArticle._id
    });
  } catch (err) {
    return res.status(500).send({
      error: err.message
    });
  }
};

module.exports.deleteArticle = async (req, res) => {
  const articleId = req.params.articleId;
  try {
    await newsService.removeArticle(articleId);
    return res.send({
      msg: 'article deleted successfully.'
    });
  } catch (err) {
    return res.status(500).send({
      error: err.message
    });
  }
};
