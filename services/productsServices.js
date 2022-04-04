const productsModel = require('../models/productsModel');

const verifyConflictName = async ({ name }) => {
  const [result] = await productsModel.verifyAlreadyName(name);

  return !result;
};

const updateProduct = async (params, body) => {
  const [{ id }, { name, quantity }] = [params, body];
  await productsModel.updateProduct(name, quantity, id);

  return ({ id, name, quantity });
};

module.exports = {
  verifyConflictName,
  updateProduct,
};
