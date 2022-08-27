const seedController = require('../controllers/seed-controller');

const seedUser = async (loop = 1) => {
	const message = []
	for (let index = 0; index <= loop; index++) {
		try {
			const { dataValues } = await seedController.AddUser();
			message.push(`ADD USER : -> ${dataValues.pseudo}`)
		} catch (error) {
			console.log(error);
		}
	}
	try {
		message.push('ADD USER : -> ', await seedController.AddAdmin())
	} catch (error) {
		console.log(error);
	}
	// console.log(message);
	return message
};

const seedTournament = async (loop = 1) => {
	const message = []
	for (let index = 0; index < loop; index++) {
		try {
			const { dataValues } = await seedController.AddTournament();
			message.push(`ADD TOURNAMENT : -> ${dataValues.name}`);
		} catch (error) {
			console.log(error);
		}
	}
	// console.log(message);
	return message
};

const seedMatch = async (loop = 1) => {
	const message = []
	for (let index = 0; index < loop; index++) {
		try {
			const { dataValues } = await seedController.AddMatch();
			message.push(`ADD MATCH --> ${dataValues.playerWhiteId} vs ${dataValues.playerBlackId}`);
		} catch (error) {
			console.log(error);
		}
	}
	// console.log(message);
	return message
}

const seedDB = async (loop = 1) => {
	const message = []
	message.push(await seedUser(loop * 20))
	message.push(await seedTournament(loop * 5))
	message.push(await seedMatch(loop * 10))
	console.log(message);
}

module.exports = {
	seedUser,
	seedTournament,
	seedMatch,
	seedDB
};
