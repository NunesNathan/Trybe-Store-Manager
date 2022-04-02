const Joi = require('joi');

const saleFormatSchema = Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().required(),
});

const saleValuesSchema = Joi.object({
  productId: Joi.number().min(1),
  quantity: Joi.number().min(1),
});

const validadeSale = (req, res, next) => {
  for (let index = 0; index < req.body.length; index += 1) {
    const saleToVerify = req.body[index];

    const { error: format } = saleFormatSchema.validate(saleToVerify);
    if (format) return res.status(400).json({ message: format.message });
    
    const { error: values } = saleValuesSchema.validate(saleToVerify);
    if (values) return res.status(422).json({ message: values.message });
  }

  next();
};

module.exports = {
  validadeSale,
};
