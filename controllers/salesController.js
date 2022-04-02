const salesModel = require('../models/salesModel');
const salesServices = require('../services/salesService');
const salesMiddleware = require('../middlewares/salesMiddleware');

const getAll = async (_req, res) => {
  const sales = await salesModel.getAll();

  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  const sale = await salesServices.getById(req.params);

  if (!sale) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(sale);
};

const insertSale = async (req, res) => {
  const result = await salesServices.postSale(req.body);

  return res.status(201).json(result);
};

const updateSale = async (req, res) => {
  const result = await salesServices.updateSale(req.params, req.body);

  res.status(200).json(result);
};

module.exports = {
  getAll,
  getById,
  postSale: [
    salesMiddleware.validadeSale,
    insertSale,
  ],
  putSale: [
    salesMiddleware.validadeSale,
    updateSale,
  ],
};
