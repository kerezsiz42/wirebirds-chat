const express = require('express');
const router = express.Router();
const userCtl = require('./controllers/userCtl');

router.get('/', (req, res) => res.redirect('/login-page'));

router.get('/login-page', userCtl.loginPage);
router.get('/register-page', userCtl.registerPage);
router.get('/conversations', userCtl.conversations);

router.post('/login', userCtl.login);
router.post('/logout', userCtl.logout);
router.post('/register', userCtl.register);

module.exports = router;