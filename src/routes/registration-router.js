const registrationController = require('../controllers/registration-controller');
const authJWT = require('../middleware/auth-middleware');
const bodyValidation = require('../middleware/body-validation-middleware');
const { matchValidator } = require('../validators/match-validator');

const registrationRouter = require('express').Router();

registrationRouter.route('/').get(registrationController.getAll).post(registrationController.add);

registrationRouter
	.route('/:id')
	.get(registrationController.get)
	.put(registrationController.update)
	.delete(registrationController.delete);

registrationRouter.route('/bytournamentid/:id').get(registrationController.getbyTournament);
registrationRouter.route('/byUserid/:id').get(registrationController.getbyUser);

module.exports = registrationRouter;
