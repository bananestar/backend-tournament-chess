const playerController = require('../controllers/player-controller');
const authJWT = require('../middleware/auth-middleware');
const bodyValidationPlayer = require('../middleware/body-validation-player-middleware');
const { playerValidator } = require('../validators/player-validator');

const playerRouter = require('express').Router();

playerRouter
	.route('/')
	.get(authJWT(), playerController.getAll)
	.post(authJWT(), bodyValidationPlayer(playerValidator), playerController.add);

playerRouter
	.route('/:id')
	.get(authJWT(),playerController.get)
	.put(authJWT(),bodyValidationPlayer(playerValidator),playerController.update)
	.delete(authJWT(),playerController.delete);

module.exports = playerRouter;
