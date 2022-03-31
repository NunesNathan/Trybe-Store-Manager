const SalesModel = require('../models/salesModel');

const getAll = async (_req, res) => {
  const sales = await SalesModel.getAll();
  return res.status(200).json(sales);
};

const getById = async () => { };

module.exports = {
  getAll,
  getById,
};
