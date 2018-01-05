require('dotenv').load();

const express = require('express');
const database = require('./src/database');

const app = express();
const PORT = process.env.PORT || 1337;

database.connect();

app.use(express.static('public'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
