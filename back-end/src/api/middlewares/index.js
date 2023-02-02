const validateRegisterFields = require('./validateRegisterFields');
const validateLoginFields = require('./validateLoginFields');
const validateSalesFields = require('./validateSalesFields');
const validateStatusSale = require('./validateStatusSale');
const tokenValidation = require('./tokenValidation');

module.exports = {
  validateLoginFields,
  validateRegisterFields,
  validateSalesFields,
  getTheUser,
  validateStatusSale,
  tokenValidation,
};
