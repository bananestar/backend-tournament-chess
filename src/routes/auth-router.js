const authController = require('../controllers/auth-controller');

const authRouter = require('express').Router();

authRouter.route('/register').post(authController.register)
authRouter.route('/login').post(authController.login)

module.exports = authRouter