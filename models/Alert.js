const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  symbol: { type: String, required: true },
  threshold: { type: Number, required: true },
});

module.exports = mongoose.model('Alert', alertSchema);
