const seedController = require('../controllers/seed-controller');
const seedRouter = require('express').Router();

seedRouter.route('/user').post(seedController.AddUser)
seedRouter.route('/tournament').post(seedController.AddTournament)
seedRouter.route('/match').post(seedController.AddMatch)

module.exports = seedRouter;