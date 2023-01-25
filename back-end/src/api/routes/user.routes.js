const { Router } = require('express');
const { userLogin, userRegister, getSellers } = require('../controllers/user.controller');
const { validateLoginFields, validateRegisterFields } = require('../middlewares');

const router = Router();

router.post('/login', validateLoginFields, userLogin);

router.post('/register', validateRegisterFields, userRegister);

router.get('/sellers', getSellers);

module.exports = router;
