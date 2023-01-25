const { Router } = require('express');
const { userLogin, userRegister } = require('../controllers/user.controller');
const { validateLoginFields, validateRegisterFields } = require('../middlewares');

const router = Router();

router.post('/login', validateLoginFields, userLogin);

router.post('/register', validateRegisterFields, userRegister);

module.exports = router;
