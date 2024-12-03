const http = require('http');
const { Server } = require('socket.io');
const { fetchStockPrice } = require('./services/stocks');

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('subscribeToStock', async (symbol) => {
    try {
      setInterval(async () => {
        const price = await fetchStockPrice(symbol);
        socket.emit('stockPriceUpdate', price);
      }, 5000); // Fetch every 5 seconds
    } catch (error) {
      socket.emit('error', error.message);
    }
  });
});
