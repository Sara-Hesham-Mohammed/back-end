async function calculatePerformance(symbol) {
    const history = await fetchStockHistory(symbol);
    const performance = analyzeTrends(history); // Define this function
    return performance;
  }
  
  module.exports = { calculatePerformance };
  