const getProducts = [
  {
    "id": 1,
    "name": "Martelo de Thor",
    "quantity": 10
  },
  {
    "id": 2,
    "name": "Traje de encolhimento",
    "quantity": 20
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América",
    "quantity": 30
  }
];

const getProductById = {
  "id": 1,
  "name": "Martelo de Thor",
  "quantity": 10
};

const postProduct = {
  "id": 4,
  "name": "hyperProduct",
  "quantity": 2
};

const productNameAvaliable = [];

const productNameUnaliable = [
  { id: 4, name: 'hyperProduct', quantity: 2 }
];

const putProduct = {
  "id": 3,
  "name": "hyperProduct",
  "quantity": 1
};

const getSales = [
  {
    "saleId": 1,
    "date": "2022-04-04T19:39:44.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-04-04T19:39:44.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2022-04-04T19:39:44.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const getSaleById = [
  {
    "date": "2022-04-04T19:39:44.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2022-04-04T19:39:44.000Z",
    "productId": 2,
    "quantity": 10
  }
];

const postSale = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
};

module.exports = {
  getProducts,
  getProductById,
  postProduct,
  productNameAvaliable,
  productNameUnaliable,
  putProduct,
  deleteProduct: getProducts,
  getSales,
  getSaleById,
  postSale,
};