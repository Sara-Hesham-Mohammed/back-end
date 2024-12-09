const axios = require('axios');
const API_KEY = _8G9NEZS6NACBCMG6;
const BASE_URL = 'https://api.example.com'; // Replace with actual API endpoint

async function fetchStockPrice(symbol) {
  try {
    const response = await axios.get(`${BASE_URL}/price`, {
      params: { symbol, apikey: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch stock price');
  }
}

module.exports = { fetchStockPrice };
