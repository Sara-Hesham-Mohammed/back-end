const express = require('express');
const { fetchStockHistory } = require('../services/stocks');
const router = express.Router();

router.get('/history/:symbol', async (req, res) => {
  try {
    const data = await fetchStockHistory(req.params.symbol);
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
