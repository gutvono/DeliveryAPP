const { Router } = require('express');
const { userLogin } = require('../controllers/login.controller');
const validateLoginFields = require('../middlewares/validateLoginFields');

const router = Router();

router.post('/', validateLoginFields, userLogin);

module.exports = router;
