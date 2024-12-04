const axios = require('axios');

module.exports.newsArticles = async () => {
  const requestURL = `https://real-time-news-data.p.rapidapi.com/top-headlines`;

  try {
   
      process.env.API_KEY
   //destructured data
    const { data } = await axios.get(requestURL,{
        params: {
            limit: 500,
            country: 'US',
            lang: 'en',
          }, //key and host in header bc that's how this API does it
        headers: {
            'x-rapidapi-key': process.env.API_KEY,
            'x-rapidapi-host': process.env.API_HOST,
          },
    });

    if (data.summary.numResults < 1) {
      return null;
    }

    res.json(response.data);

  } catch (err) {
    console.log(err);
    throw new Error('Could not fetch top headlines');
  }
};
