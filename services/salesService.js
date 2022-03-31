const SalesModel = require('../models/salesModel');

const getById = async ({ id }) => {
  const sale = await SalesModel.getById(id);
  if (!sale[0]) {
    return false;
  }
  return sale;
};

module.exports = {
  getById,
};
