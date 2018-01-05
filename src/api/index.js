const fetch = require('node-fetch');

module.exports = {
  get: async function(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(`Error: $[err}`);
    }
  },
};
