const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const getById = async () => { };

module.exports = {
  getAll,
  getById,
};