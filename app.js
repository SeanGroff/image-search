require('dotenv').load();

// Mongoose Models
require('./src/database/SearchHistoryModel');

const express = require('express');
const database = require('./src/database');
const routes = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 1337;

database.connect();

app.use(express.static('public'));

app.get('/api/imagesearch/:imgSearch', routes.imgSearch);

app.get('/api/latest/imagesearch', routes.latestSearches);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
