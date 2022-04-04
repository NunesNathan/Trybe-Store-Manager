const productsModel = require('../models/productsModel');
const productsServices = require('../services/productsServices');
const productsMiddleware = require('../middlewares/productsMiddleware');

const getAll = async (_req, res) => {
  const products = await productsModel.getAll();

  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const product = await productsModel.getById(req.params);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(product);
};

const insertProduct = async (req, res) => {
  const result = await productsModel.postProduct(req.body);

  return res.status(201).json(result);
};

const updateProduct = async (req, res) => {
  const product = await productsServices.updateProduct(req.params, req.body);

  return res.status(200).json(product);
};

const deleteProductById = async (req, res) => {
  await productsModel.deleteProduct(req.params);

  res.status(204).end();
};

module.exports = {
  getAll,
  getById,
  postProduct: [
    productsMiddleware.verifyProductInputs,
    insertProduct,
  ],
  putProduct: [
    productsMiddleware.verifyProductInputs,
    productsMiddleware.existsIdToModify,
    updateProduct,
  ],
  deleteProduct: [
    productsMiddleware.existsIdToModify,
    deleteProductById,
  ],
};
