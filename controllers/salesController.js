const SalesModel = require('../models/salesModel');
const salesServices = require('../services/salesService');

const getAll = async (_req, res) => {
  const sales = await SalesModel.getAll();
  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  const sale = await salesServices.getById(req.params);

  if (!sale) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(sale);
};

module.exports = {
  getAll,
  getById,
};
