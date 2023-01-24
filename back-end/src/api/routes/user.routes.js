const { Router } = require('express');
const { userLogin } = require('../controllers/user.controller');
const validateLoginFields = require('../middlewares/validateLoginFields');

const router = Router();

router.post('/login', validateLoginFields, userLogin);

module.exports = router;
