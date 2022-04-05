const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');
const mocked = require('../mock/responses')

describe('productsModels', () => {
  describe('get products', async () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([mocked.getProducts]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('get all products', async () => {
      const response = await productsModel.getAll();

      expect(response).to.be.equals(mocked.getProducts);
    });
    
    it('get all products returns without array', async () => {
      const response = await productsModel.getAll();

      expect(response).not.to.be.equals([mocked.getProducts]);
    });
  });

  describe('get product by id', async () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[mocked.getProductById]]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('get one product', async () => {
      const response = await productsModel.getById(1);

      expect(response.id).to.be.equals(1);
    });
    
    it('get one product without array', async () => {
      const response = await productsModel.getById(1);

      expect(response).not.to.be.equals([mocked.getProductById]);
    });
  });

  describe('post product', async () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('post one product', async () => {
      const response = await productsModel.postProduct('hyperProduct', 2);

      expect(response.name).to.be.equals('hyperProduct');
      expect(response.id).to.be.equals(4);
      expect(response.quantity).to.be.equals(2);
    });
    
    it('post one product without array', async () => {
      const response = await productsModel.postProduct();

      expect(response).not.to.be.equals([mocked.postProduct]);
    });
  });

  describe('verify already product name', async () => {
    before(() => {
      sinon.stub(connection, 'execute')
        .onFirstCall().resolves([mocked.productNameAvaliable])
        .onSecondCall().resolves([mocked.productNameUnaliable])
    });

    after(() => {
      connection.execute.restore();
    });

    it('product name avaliable', async () => {
      const response = await productsModel.verifyAlreadyName('hyperProduct');

      expect(response).to.be.equals(mocked.productNameAvaliable);
    });
    
    it('product name unavailable', async () => {
      const response = await productsModel.verifyAlreadyName('hyperProduct');

      expect(response).to.be.equals(mocked.productNameUnaliable);
    });
  });

  describe('update product', async () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([mocked.putProduct]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('has been updated', async () => {
      const response = await productsModel.updateProduct('hyperProduct', 1, 3)

      expect(response).to.be.equals(mocked.putProduct);
    });
  });

  describe('delete product', async () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves();
    });

    after(() => {
      connection.execute.restore();
    });

    it('have been deleted', async () => {
      await productsModel.deleteProduct(3);

      sinon.assert.called(connection.execute);
    });
  });
});