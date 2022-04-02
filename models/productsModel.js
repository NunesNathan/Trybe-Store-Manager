const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection
    .execute('SELECT * FROM StoreManager.products ORDER BY id;');

  return products;
};

const getById = async ({ id }) => {
  const [product] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?;', [id]);

  return product;
};

const postProduct = async ({ name, quantity }) => {
  const [product] = await connection
    .execute(`INSERT INTO StoreManager.products (name, quantity)
     VALUES (?, ?)`, [name, quantity]);

  return ({ id: product.insertId, name, quantity });
};

const verifyAlreadyName = async (name) => {
  const [product] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE name = ?;', [name]);

  return product;
};

const updateProduct = async (name, quantity, id) => {
  const [product] = await connection
    .execute(`UPDATE StoreManager.products
     SET name = ?, quantity = ?
     WHERE id = ?;`, [name, quantity, id]);

  return product;
};

const deleteProduct = async ({ id }) => {
  await connection
    .execute(`DELETE FROM StoreManager.products
     WHERE id = ?;`, [id]);
};

module.exports = {
  getAll,
  getById,
  postProduct,
  verifyAlreadyName,
  updateProduct,
  deleteProduct,
};
