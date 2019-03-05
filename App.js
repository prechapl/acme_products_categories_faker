const express = require('express');
const app = express();
const { Product, Category } = require('./db');
const path = require('path');

app.get('/app.js', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'dist', 'main.js')));

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/categories', async (req, res, next) => {
  const allCategories = await Category.findAll();
  const allProducts = await Product.findAll();
  const data = {
    categories: allCategories,
    products: allProducts
  };
  res.send(data);
  next();
});

app.post('/api/categories', (req, res, next) => {
  Category.createFake()
    .then(category => res.send(category))
    .catch(next);
});

app.post('/api/categories/:id/products', async (req, res, next) => {
  const parentCat = await Category.findOne({ where: { id: req.params.id } });
  const newProduct = await parentCat.createProduct();
  res.send(newProduct);
});

app.delete('/api/categories/:id', async (req, res, next) => {
  await Product.destroy({ where: { categoryId: req.params.id } });
  await Category.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
  next();
});

app.delete('/api/products/:id', async (req, res, next) => {
  await Product.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
  next();
});

module.exports = app;
