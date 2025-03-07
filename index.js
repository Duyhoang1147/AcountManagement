const express = require('express');
const conectDB = require('./database/mongoDB');

const app = express();

const PORT = 8080;

conectDB();

app.get('/', function (req, res) {
  res.send('Hello World')
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});