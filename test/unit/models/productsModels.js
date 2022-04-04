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
    
    it('get all products returns with wrong type', async () => {
      const response = await productsModel.getAll();

      expect(response).not.to.be.equals([mocked.getProducts])
    });
  });
});