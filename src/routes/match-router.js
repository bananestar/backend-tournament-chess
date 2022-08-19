const matchController = require('../controllers/match-controller');
const authJWT = require('../middleware/auth-middleware');
const bodyValidation = require('../middleware/body-validation-middleware');
const { matchValidator } = require('../validators/match-validator');

const matchRouter = require('express').Router();

matchRouter
	.route('/')
	.get(matchController.getAll)
	.post(authJWT(), bodyValidation(matchValidator), matchController.add);

matchRouter
	.route('/:id')
	.get(matchController.get)
	.put(authJWT(), bodyValidation(matchValidator), matchController.update)
	.delete(authJWT(), bodyValidation(matchValidator), matchController.delete);

module.exports = matchRouter;
