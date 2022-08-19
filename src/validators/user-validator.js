const yup = require('yup');

const userValidator = yup.object().shape({
	pseudo: yup.string().trim().required().max(50),
	email: yup.string().email().trim().required().max(255),
	password: yup.string().trim().required().max(60),
	birthDate: yup.date().required(),
	gender: yup.string().matches('^(?:FEMALE|OTHER|MALE)$').required().max(6),
	elo: yup.number().positive().integer().max(3000).min(0),
	createdAt:yup.date(),
	updatedAt:yup.date()
});

const userUpdateValidator = yup.object().shape({
	pseudo: yup.string().trim().max(50),
	email: yup.string().email().trim().max(255),
	password: yup.string().trim().max(60),
	birthDate: yup.date(),
	gender: yup.string().matches('^(?:FEMALE|OTHER|MALE)$').max(6),
	elo: yup.number().positive().integer().max(3000).min(0),
	createdAt:yup.date(),
	updatedAt:yup.date()
})

module.exports = { userValidator, userUpdateValidator };
