const productsModel = require('../models/productsModel');

const verifyConflictName = async (name) => {
  const [result] = await productsModel.verifyAlreadyName(name);

  return !result;
};

const updateProduct = async (id, name, quantity) => {
  await productsModel.updateProduct(name, quantity, id);

  return ({ id: +id, name, quantity });
};

module.exports = {
  verifyConflictName,
  updateProduct,
};
