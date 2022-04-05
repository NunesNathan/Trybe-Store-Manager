const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const salesServices = require('../../../services/salesServices');
const mocked = require('../mock/responses')

describe('salesServices', () => {
  describe('get sales', async () => {
    before(() => {
      sinon.stub(salesModel, 'getById')
        .onFirstCall().resolves(mocked.getSaleById)
        .onSecondCall().resolves([])
    });

    after(() => {
      salesModel.getById.restore();
    });

    it('existing id', async () => {
      const response = await salesServices.getById(1);

      expect(response).to.be.equals(mocked.getSaleById);
    });

    it('not used id', async () => {
      const response = await salesServices.getById(132);

      expect(response).to.be.false;
    });
  });
});