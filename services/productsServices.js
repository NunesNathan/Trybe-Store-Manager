const productsModel = require('../models/productsModel');

const verifyConflictName = async ({ name }) => {
  const [result] = await productsModel.verifyConflictName(name);

  return !result;
};

module.exports = {
  verifyConflictName,
};
