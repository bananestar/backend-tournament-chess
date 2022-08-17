const tournamentController = require('../controllers/tournament-controller');
const authJWT = require('../middleware/auth-middleware');

const tournamentRouter = require('express').Router();

tournamentRouter
	.route('/')
	.get(tournamentController.getAll)
	.post(authJWT(), tournamentController.add);

tournamentRouter
	.route('/:id')
	.get(tournamentController.get)
	.put(authJWT(),tournamentController.update)
	.delete(authJWT(),tournamentController.delete);

module.exports = tournamentRouter;
