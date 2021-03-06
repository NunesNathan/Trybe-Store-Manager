const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection
    .execute(`SELECT SP.sale_id as saleId, S.date, SP.product_id as productId, SP.quantity
     FROM StoreManager.sales_products as SP
     JOIN StoreManager.products AS P ON SP.product_id = P.id
     JOIN StoreManager.sales AS S ON SP.sale_id = S.id ORDER BY SP.sale_id, SP.product_id;`);

  return sales;
};

const getById = async (id) => {
  const [sale] = await connection
    .execute(`SELECT S.date, SP.product_id as productId, SP.quantity
     FROM StoreManager.sales_products as SP
     JOIN StoreManager.products AS P ON SP.product_id = P.id
     JOIN StoreManager.sales AS S ON SP.sale_id = S.id WHERE SP.sale_id = ?
     ORDER BY SP.product_id;`, [id]);

  return sale;
};

const createSale = async () => {
  const [createdSale] = await connection
    .execute(`INSERT INTO StoreManager.sales (date)
     VALUES (NOW());`);

  return createdSale;
};

const postSale = async (saleId, productId, quantity) => {
  await connection
    .execute(`INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
     VALUES (?, ?, ?)`, [saleId, productId, quantity]);

  return ({ productId, quantity });
};

const updateSale = async (saleId, productId, quantity) => {
  await connection
    .execute(`UPDATE StoreManager.sales_products
     SET quantity = ?
     WHERE sale_id = ?
     AND product_id = ?;`, [quantity, saleId, productId]);

  return ({ productId, quantity });
};

module.exports = {
  getAll,
  getById,
  createSale,
  postSale,
  updateSale,
};
