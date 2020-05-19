const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');

router.get('/', (req, res) => res.redirect('/login-page'));

router.get('/login-page', userController.loginPage);
router.get('/register-page', userController.registerPage);
router.get('/conversations', userController.conversations);

router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.post('/register', userController.register);

module.exports = router;