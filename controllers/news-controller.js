const newsService = require("../services/news-service");

//gets all news
module.exports.getAllNews = async (req, res) => {
  try {
    const news = await newsService.getTopHeadlines();
    return res.send({ news });
  } catch (err) {
    res.status(500);
    return res.send({
      error: err.message,
    });
  }
};

//gets news by topic
module.exports.getTopNewsByTopic = async (req, res) => {
  const topic = req.params.topic;
  try {
    const newsTopic = await newsService.getTopByTopic(topic);

    if (!newsTopic) {
      return res.status(404).send({
        error: "News Topic not found.",
      });
    }

    return res.send({ newsTopic });
  } catch (err) {
    res.status(500);
    return res.send({
      error: err.message,
    });
  }
};

//gets a single news article
module.exports.getArticle = async (req, res) => {
  const articleId = req.params.articleId;
  try {
    const article = await newsService.findArticleById(articleId);
    if (!article) {
      return res.status(404).send({
        error: "article not found.",
      });
    }
    return res.send({
      article: article,
    });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};

//gets a single news article
module.exports.postArticle = async (req, res) => {
  try {
    const articleInfo = {
      topicID: req.body.topicID, 
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      photoURL: req.body.photoURL,
      publishedDateTime: req.body.publishedDateTime,
      sourceURL: req.body.sourceURL,
    };

    await newsService.addArticle(articleInfo);
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};
