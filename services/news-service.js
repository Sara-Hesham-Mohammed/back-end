const axios = require("axios");

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
  }  catch (error) {
    console.error(error);
  }
};

module.exports.getTopByTopic = async (topic) => {
  const options = {
    method: "GET",
    url: "https://real-time-news-data.p.rapidapi.com/topic-headlines",
    params: {
      topic: topic,
      limit: "500",
      country: "US",
      lang: "en",
    },
    headers: {
      "x-rapidapi-key": "7281a3404fmshbc430b8e4036f16p138641jsn532c103b5013",
      "x-rapidapi-host": "real-time-news-data.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
