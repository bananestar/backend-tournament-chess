const tournamentController = require('../controllers/tournament-controller');
const authJWT = require('../middlewares/auth-middleware');
const bodyValidation = require('../middleware/body-validation-middleware');
const { tournamentValidator } = require('../validators/tournament-validator');

const tournamentRouter = require('express').Router();

tournamentRouter
	.route('/')
	.get(tournamentController.getAll)
	.post(authJWT(),bodyValidation(tournamentValidator), tournamentController.add);

tournamentRouter
	.route('/:id')
	.get(tournamentController.get)
	.put(authJWT(), bodyValidation(tournamentValidator), tournamentController.update)
	.delete(authJWT(), tournamentController.delete);

module.exports = tournamentRouter;
