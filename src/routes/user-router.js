const userController = require('../controllers/user-controller');
const authJWT = require('../middleware/auth-middleware');
const bodyValidation = require('../middleware/body-validation-middleware');
const { userUpdateValidator } = require('../validators/user-validator');
const userRouter = require('express').Router();

userRouter.route('/').get(userController.getAll);

userRouter
	.route('/:id')
	.get(userController.get)
	.put(authJWT(), bodyValidation(userUpdateValidator), userController.update)
	.delete(authJWT(), userController.delete);

module.exports = userRouter;
