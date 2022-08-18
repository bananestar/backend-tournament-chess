const yup = require('yup');

const tournamentValidator = yup.object().shape({
	name: yup.string().trim().required().max(50),
	location: yup.string().trim().required().max(255),
	PlayersMin: yup
		.number()
		.require()
		.when('PlayersMax', (PlayersMax, schema) => {
			return PlayersMax ? schema.max(PlayersMax) : schema.max(32);
		}),
	PlayersMax: yup
		.number()
		.max(32)
		.require()
		.when('PlayersMin', (PlayersMin, schema) => {
			return PlayersMin ? schema.min(PlayersMin) : schema.min(2);
		}),
	EloMin: yup
		.number()
		.require()
		.when('EloMax', (EloMax, schema) => {
			return EloMax ? schema.max(EloMax) : schema.max(3000);
		}),
	EloMax: yup
		.number(EloMin)
		.max(3000)
		.require()
		.when('EloMin', (EloMin, schema) => {
			return EloMin ? schema.min(EloMin) : schema.min(0);
		}),
	category: yup.string().trim().required().max(50),
	statut: yup.string().trim().required().max(50),
	currentRound: yup.number().min(0).positive().integer().required(),
	womenOnly: yup.boolean().required(),
	canRegister: yup.boolean().required(),
	registrationAt: yup.date().required(),
});

module.exports = { tournamentValidator };
