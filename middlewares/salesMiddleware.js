const Joi = require('joi');

const saleFormatSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().required(),
});

const saleValuesSchema = Joi.object({
  productId: Joi.number().min(5),
  quantity: Joi.number().min(1),
});

const validadeSale = (req, res, next) => {
  const { error: format } = saleFormatSchema.validate(req.body);
  console.log(format);
  if (format) return res.status(400).json({ message: format.message });

  const { error: values } = saleValuesSchema.validate(req.body);
  console.log(values);
  if (values) return res.status(422).json({ message: values.message });

  next();
};

module.exports = {
  validadeSale,
};