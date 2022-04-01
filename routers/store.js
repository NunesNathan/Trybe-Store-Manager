const express = require('express');

const productsController = require('../controllers/productsController');
const salesController = require('../controllers/salesController');

const defaultRoute = (_request, response) => response.send();

const router = express.Router();

router
  .get('/', defaultRoute)
  .get('/products', productsController.getAll)
  .get('/products/:id', productsController.getById)
  .get('/sales', salesController.getAll)
  .get('/sales/:id', salesController.getById)
  .post('/products', productsController.postProduct)
  .put('/products/:id', productsController.putProduct)
  .delete('/products/:id', productsController.deleteProduct);
  // .post('/sales', salesController.postSale);

module.exports = router;