const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const salesServices = require('../../../services/salesServices');
const salesController = require('../../../controllers/salesController');
const mocked = require('../mock/responses')

describe('salesController', () => {
  describe('get all', async () => {
    const req = {};
    const res = {};

    before(() => {
      sinon.stub(salesModel, 'getAll').resolves(mocked.getSales)
      // sinon.stub(res.status).resolves(res)
      // sinon.stub(res.json).resolves()

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    after(() => {
      salesModel.getAll.restore();
    });


    it('success sales return', async () => {
      await salesController.getAll(req, res);

      expect(res.json.calledWith(mocked.getSales)).to.be.equal(true);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});