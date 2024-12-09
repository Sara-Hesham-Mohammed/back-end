const axios = require('axios');

module.exports.getTopHeadlines = async () => {
  const requestURL = `https://real-time-news-data.p.rapidapi.com/top-headlines`;

  try {
    const { data } = await axios.get(requestURL, {
      params: {
        limit: 500,
        country: 'US',
        lang: 'en',
      },
      headers: {
        'x-rapidapi-key': process.env.API_KEY,
        'x-rapidapi-host': process.env.API_HOST,
      },
    });
    console.log(data.data[0].title);
    
    return data;
  } catch (error) {
    console.error('Error fetching top headlines:', error.message);
    throw error;
  }
};
