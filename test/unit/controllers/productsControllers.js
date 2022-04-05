const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../models/productsModel');
const productsServices = require('../../../services/productsServices');
const productsController = require('../../../controllers/productsController');
const mocked = require('../mock/responses')

describe('productsController', () => {
  describe('get all', async () => {
    const req = {};
    const res = {};

    before(() => {
      sinon.stub(productsModel, 'getAll').resolves(mocked.getProducts)
      // sinon.stub(res.status).resolves(res)
      // sinon.stub(res.json).resolves()

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    after(() => {
      productsModel.getAll.restore();
    });


    it('success products return', async () => {
      await productsController.getAll(req, res);

      expect(res.json.calledWith(mocked.getProducts)).to.be.equal(true);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});