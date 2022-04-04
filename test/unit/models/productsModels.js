const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');
const mocked = require('../mock/responses')

describe('productsModels', () => {
  describe('get products', async () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([mocked.getProducts])
    });

    after(() => {
      connection.execute.restore();
    });

    it('get all products', async () => {
      const response = await productsModel.getAll();

      expect(response).to.be.equals(mocked.getProducts)
    });
    
    it('get all products returns without array', async () => {
      const response = await productsModel.getAll();

      expect(response).not.to.be.equals([mocked.getProducts])
    });
  });

  describe('get product by id', async () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[mocked.getProductById]])
    });

    after(() => {
      connection.execute.restore();
    });

    it('get one product', async () => {
      const response = await productsModel.getById();

      expect(response).to.be.equals(mocked.getProductById)
    });
    
    it('get one product without array', async () => {
      const response = await productsModel.getById();

      expect(response).not.to.be.equals([mocked.getProductById])
    });
  });
});