const ProductsModel = require('../models/productsModel');

const getAll = async (_req, res) => {
  const products = await ProductsModel.getAll();
  return res.status(200).json(products);
};

const getById = async () => { };

module.exports = {
  getAll,
  getById,
};
