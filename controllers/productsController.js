const productsModel = require('../models/productsModel');
const productsServices = require('../services/productsServices');
const productsMiddleware = require('../middlewares/productsMiddleware');

const getAll = async (_req, res) => {
  const products = await productsModel.getAll();

  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const product = await productsModel.getById(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(product);
};

const insertProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const result = await productsModel.postProduct(name, quantity);

  return res.status(201).json(result);
};

const updateProduct = async (req, res) => {
  const [{ id }, { name, quantity }] = [req.params, req.body];

  const product = await productsServices.updateProduct(id, name, quantity);

  return res.status(200).json(product);
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;

  await productsModel.deleteProduct(id);

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
