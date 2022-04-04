const salesModel = require('../models/salesModel');

const getById = async (id) => {
  const sale = await salesModel.getById(id);

  if (!sale[0]) {
    return false;
  }
  return sale;
};

const postSale = async (body) => {
  const { insertId: id } = await salesModel.createSale();

  const result = await Promise.all(
    body.map(async ({ productId, quantity }) => (
      salesModel.postSale(id, productId, quantity))),
  );

  return ({ id, itemsSold: result });
};

const updateSale = async (id, body) => {
  const result = await Promise.all(
    body.map(async ({ productId, quantity }) => (
      salesModel.updateSale(id, productId, quantity))),
    );

  return ({
    saleId: id,
    itemUpdated: result,
  });
};

module.exports = {
  getById,
  postSale,
  updateSale,
};
