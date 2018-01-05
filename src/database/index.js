const mongoose = require('mongoose');

module.exports = {
  connect: async function() {
    const mLab = `mongodb://${process.env.HOST}/${process.env.NAME}`;
    const options = {
      autoIndex: false,
    };

    try {
      await mongoose.connect(mLab, options);
      console.log('Successfully connected to the Database');
    } catch (err) {
      console.log(`Error connecting to the Database: ${err}`);
    }
  },
  save: async function(model) {
    try {
      await model.save();
    } catch (err) {
      console.log(`Error: Save to Database Failed: ${err}`);
    }
  },
};
