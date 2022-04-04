const Joi = require('joi');

const productsModel = require('../models/productsModel');
const productsServices = require('../services/productsServices');

const productsFormatSchema = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.number().required(),
});

const productsValuesSchema = Joi.object({
  name: Joi.string().min(5),
  quantity: Joi.number().min(1),
});

const validadeProduct = (req, res, next) => {
  const { error: format } = productsFormatSchema.validate(req.body);
  if (format) return res.status(400).json({ message: format.message });

  const { error: values } = productsValuesSchema.validate(req.body);
  if (values) return res.status(422).json({ message: values.message });

  next();
};

const verifyConflictName = async (req, res, next) => {
  const ableToInsert = await productsServices.verifyConflictName(req.body);

  if (!ableToInsert) {
    return res.status(409).json({ message: 'Product already exists' });
  }

  next();
};

const existsIdToModify = async (req, res, next) => {
  const exists = await productsModel.getById(req.params);

  if (!exists) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

module.exports = {
  verifyProductInputs: [
    validadeProduct,
    verifyConflictName,
  ],
  verifyConflictName,
  existsIdToModify,
};
