const axios = require("axios");
const NewsSchema = require("../models/NewsArticle");
const NewsModel = require("../models/NewsArticle");

module.exports.getTopHeadlines = async () => {
  const options = {
    method: "GET",
    url: "https://newsapi.org/v2/top-headlines",
    params: {
      country: "us",
      apiKey: "a694f6ec00e049ae95bb13cd0905fdd3",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

module.exports.getTopByTopic = async (topic) => {
  const options = {
    method: "GET",
    url: `https://newsapi90.p.rapidapi.com/topic/${topic}`,
    params: {
      language: "en-US",
      region: "US",
    },
    headers: {
      "x-rapidapi-key": "7281a3404fmshbc430b8e4036f16p138641jsn532c103b5013",
      "x-rapidapi-host": "newsapi90.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

module.exports.getTopByID = async (articleID) => {
  const options = {
    method: "GET",
    url: `https://newsapi90.p.rapidapi.com/topic/${articleID}`,
    params: {
      language: "en-US",
      region: "US",
    },
    headers: {
      "x-rapidapi-key": "7281a3404fmshbc430b8e4036f16p138641jsn532c103b5013",
      "x-rapidapi-host": "newsapi90.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

module.exports.addArticle = async (articleInfo) => {
  try {
    const article = new NewsModel({
      topicID: article.topicID, // Map topicID to id
      title: article.title,
      content: article.content,
      author: article.author,
      photoURL: article.photoURL,
      publishedDateTime: article.publishedDateTime,
      sourceURL: article.sourceURL,
    });

    await article.save();
  } catch (error) {
    console.error(error);
  }
};
