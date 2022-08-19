const yup = require('yup');

const tournamentValidator = yup.object().shape({
	name: yup.string().trim().required().max(50),
	location: yup.string().trim().required().max(255),
	PlayersMin: yup
		.number()
		.min(2)
		.max(32)
		.required()
		,
	PlayersMax: yup
		.number()
		.max(32)
		.required()
		.moreThan(yup.ref('playersMin'), 'Max must be higher than player min')
		,
	EloMin: yup
		.number()
		.min(0)
		.max(3000)
		.required()
		,
	EloMax: yup
		.number()
		.max(3000)
		.required()
		.moreThan(yup.ref('EloMin'), 'Max must be higher than player min')
		,
	category: yup.string().trim().required().max(50),
	statut: yup.string().trim().required().max(50),
	currentRound: yup.number().min(0).positive().integer().required(),
	womenOnly: yup.boolean().required(),
	canRegister: yup.boolean().required(),
	registrationAt: yup.date().required(),
	createdAt:yup.date(),
	updatedAt:yup.date()
});

module.exports = { tournamentValidator };
