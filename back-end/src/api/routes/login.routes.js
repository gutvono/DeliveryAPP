const { Router } = require('express');
const { userLogin } = require('../controller/login.controller');
const validateLoginFields = require('../middlewares/validateLoginFields');

const router = Router();

router.post('/', validateLoginFields, userLogin);

module.exports = router;
