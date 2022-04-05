const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../models/productsModel');
const productsServices = require('../../../services/productsServices');
const mocked = require('../mock/responses')

describe('productsServices', () => {
  describe('update product', async () => {
    before(() => {
      sinon.stub(productsModel, 'updateProduct').resolves();
    });

    it('has been updated', async () => {
      const response = await productsServices.updateProduct(3, 'hyperProduct', 1)

      expect(response).to.be.eql(mocked.putProduct);
    });
  });
});