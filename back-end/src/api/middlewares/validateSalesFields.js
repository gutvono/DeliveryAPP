const Joi = require('joi');

const saleDataSchema = Joi.object({
  products: Joi.array().items(Joi.object({
    id: Joi.number().required(),
    qtd: Joi.number().min(1).required(),
  })).required(),
  details: Joi.object({
    sellerId: Joi.number().required(),
    address: Joi.string().required(),
    number: Joi.string().required(),
  }).required(),
});

function validateSalesFields(req, res, next) {
  const saleData = req.body;
  const saleDataValidate = saleDataSchema.validate(saleData);
  if (saleDataValidate.error) {
    return res.status(400).json({ message: saleDataValidate.error.message });
  }
  next();
}

module.exports = validateSalesFields;
