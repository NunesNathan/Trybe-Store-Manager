const Joi = require('joi');

const saleFormatSchema = Joi.array().items(
  Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().required(),
  }),
);

const saleValuesSchema = Joi.array().items(
  Joi.object({
  productId: Joi.number().min(1),
  quantity: Joi.number().min(1),
  }),
);

const validadeSale = (req, res, next) => {
  const { error: format } = saleFormatSchema.validate(req.body);
  if (format) return res.status(400).json({ message: format.message });

  const { error: values } = saleValuesSchema.validate(req.body);
  if (values) return res.status(422).json({ message: values.message });

  next();
};

module.exports = {
  validadeSale,
};
