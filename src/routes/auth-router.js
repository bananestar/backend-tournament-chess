const { userValidator } = require('../validators/user-validator');
const bodyValidation = require('../middleware/body-validation-middleware');
const authController = require('../controllers/auth-controller');

const authRouter = require('express').Router();

authRouter.route('/register').post(bodyValidation(userValidator),authController.register)
authRouter.route('/login').post(authController.login)

module.exports = authRouter