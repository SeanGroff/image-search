const mongoose = require('mongoose');
const api = require('../api');
const database = require('../database');

const SearchHistory = mongoose.model('SearchHistoryModel');

module.exports = {
  imgSearch: async function(req, res) {
    // API Call
    const searchResults = await api.get(
      `https://www.googleapis.com/customsearch/v1?key=${
        process.env.API_KEY
      }&cx=${process.env.CSE_ID}&q=${
        req.params.imgSearch
      }&searchType=image&start=${req.query.offset || '1'}`
    );

    // Save Search Query to Database
    const searchHistory = new SearchHistory({
      term: req.params.imgSearch,
      when: new Date(Date.now()).toString(),
    });

    await database.save(searchHistory);

    // Display Results
    res.json(
      searchResults.items.map(img => ({
        imgUrl: img.link,
        altText: img.snippet,
        pageUrl: img.image.contextLink,
      }))
    );
  },
  latestSearches: async function(req, res) {
    try {
      const searches = await SearchHistory.find()
        .sort({ when: -1 })
        .limit(10);
      res.json(
        searches.map(search => ({
          term: search.term,
          when: search.when,
        }))
      );
    } catch (err) {
      console.log(`Error finding latest searches: ${err}`);
    }
  },
};
