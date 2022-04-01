const { validadeProduct } = require('../middlewares/productsMiddleware');
const ProductsModel = require('../models/productsModel');

const getAll = async (_req, res) => {
  const products = await ProductsModel.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const [product] = await ProductsModel.getById(req.params);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(product);
};

const insertProduct = async (req, res) => {
  const result = await ProductsModel.postProduct(req.body);

  return res.status(202).json(result);
};

module.exports = {
  getAll,
  getById,
  postProduct: [
    validadeProduct,
    insertProduct,
  ],
};
