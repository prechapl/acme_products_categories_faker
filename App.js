const express = require('express')
const app = express()

app.get('/', (req, res, next) => {
  res.redirect('/index')
});

// app.get('/', (req, res, next) => {
//   res.send('hello')
// })


module.exports = app
