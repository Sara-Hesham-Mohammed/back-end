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
  // notice how we extract the productId from the dynamic route that should be /news/:productId
  const articleId = req.params.productId;
  try {
    const article = await newsService.findProductById(productId);
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

module.exports.postProduct = async (req, res) => {
  const productInfo = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imgURL: req.body.imgURL,
    supplierId: req.body.supplierId
  };
  try {
    const createdProduct = await newsService.addNewProduct(productInfo);
    return res.status(201).send({
      msg: 'article created successfully.',
      productId: createdProduct._id
    });
  } catch (err) {
    return res.status(500).send({
      error: err.message
    });
  }
};

module.exports.deleteProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    await newsService.removeProduct(productId);
    return res.send({
      msg: 'article deleted successfully.'
    });
  } catch (err) {
    return res.status(500).send({
      error: err.message
    });
  }
};
