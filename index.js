const express = require('express')
const app = express()

const PORT = 8080;

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(PORT);