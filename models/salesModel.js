const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection
    .execute('SELECT * FROM StoreManager.sales_products ORDER BY sale_id, product_id;');
  return sales;
};

const getById = async () => { };

module.exports = {
  getAll,
  getById,
};