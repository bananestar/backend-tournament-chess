const seedController = require('../controllers/seed-controller');

const seedUser = (nb) => {
    seedController.AddUser()
}

module.exports = {
    seedUser
}