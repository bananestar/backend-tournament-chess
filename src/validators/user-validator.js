const yup = require('yup');

const userValidator = yup.object().shape({
	pseudo: yup.string().trim().required().max(50),
	email: yup.string().email().trim().required().max(255),
	password: yup.string().trim().required().max(60),
	birthDate: yup.date().required(),
	gender: yup.string().matches('[mof]{1,}').required().max(1),
	elo: yup.number().positive().integer().max(3000).min(0),
});

module.exports = { userValidator };
