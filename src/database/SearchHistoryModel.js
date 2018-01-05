const mongoose = require('mongoose');

const searchHistory = new mongoose.Schema({
  term: String,
  when: String,
});

module.exports = mongoose.model('SearchHistoryModel', searchHistory);
