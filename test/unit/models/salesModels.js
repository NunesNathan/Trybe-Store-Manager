const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');
const mocked = require('../mock/responses')

describe('salesModels', () => {
  describe('get sales', async () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([mocked.getSales]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('get all sales', async () => {
      const response = await salesModel.getAll();

      expect(response).to.be.equals(mocked.getSales);
    });

    it('get all sales returns without array', async () => {
      const response = await salesModel.getAll();

      expect(response).not.to.be.equals([mocked.getProducts]);
    });
  });

  describe('get sale by id', async () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([mocked.getSaleById]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('get one sale', async () => {
      const response = await salesModel.getById(1);

      expect(response[0].productId).to.be.equals(1);
      expect(response[0].quantity).to.be.equals(5);
      expect(response[1].productId).to.be.equals(2);
      expect(response[1].quantity).to.be.equals(10);
    });
  });

  describe('create sale date', async () => {
    const result = { insertId: 3 };
    before(() => {
      sinon.stub(connection, 'execute').resolves([result]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('have been called', async () => {
      await salesModel.createSale();

      sinon.assert.called(connection.execute);
    });
    
    it('have been created', async () => {
      const response = await salesModel.createSale();

      expect(response).to.be.equal(result)
    });
  });

  describe('post sale', async () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([mocked.postSale]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('post one product', async () => {
      const response = await salesModel.postSale(3, 3, 1);

      expect(response.productId).to.be.equals(3);
      expect(response.quantity).to.be.equals(1);
    });
  });

  describe('update sale', async () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([mocked.postSale]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('post one product', async () => {
      const response = await salesModel.updateSale(3, 3, 1);

      expect(response.productId).to.be.equals(3);
      expect(response.quantity).to.be.equals(1);
    });
  });
});