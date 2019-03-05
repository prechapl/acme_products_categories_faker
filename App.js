const express = require('express')
const app = express()
const { Product, Category} = require('./db');
const path = require('path');


app.get('/app.js', (req, res, next) => res.sendFile(path.join(__dirname, 'dist', 'main.js')));

app.get('/', (req, res, next ) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/categories', ( req, res, next ) => {
  Category.findAll()
    .then( categories => res.send(categories))
    .catch(next)
});

app.get('/api/products', ( req, res, next ) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next)
});

app.post('/api/categories', ( req, res, next ) => {
  Category.createFake()
    .then( category => res.send(category))
    .catch(next);
});

app.post('/api/categories/:id/products', ( req, res, next ) => {
  Product.createFake()
    .then( product => res.send(product))
    .catch(next);
});

app.delete('/api/categories/:id', ( req, res, next ) => {
  Category.destroy({
    where: { id: req.params.id }
  })
  .then( () => res.sendStatus(204))
  .catch(next);
});

app.delete('/api/products/:id', ( req, res, next ) => {
  Product.destroy({
    where: { id: req.params.id }
  })
  .then( () => res.sendStatus(204))
  .catch(next);
});

module.exports = app
