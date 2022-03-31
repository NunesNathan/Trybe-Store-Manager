const express = require('express');

const ProductsModel = require('../models/productsModel');
const SalesModel = require('../models/salesModel');

const router = express.Router();

router
  .get('/products', ProductsModel.getAll)
  .get('/products/:id', ProductsModel.getById)
  .get('/sales', SalesModel.getAll)
  .get('/sales/:id', SalesModel.getById);

module.exports = router;