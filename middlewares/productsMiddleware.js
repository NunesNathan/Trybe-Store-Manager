const Joi = require('joi');

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
  console.log(format);
  if (format) return res.status(400).json({ message: format.message });
  const { error: values } = productsValuesSchema.validate(req.body);
  console.log(values);
  if (values) return res.status(422).json({ message: values.message });

  next();
};

module.exports = {
  validadeProduct,
};