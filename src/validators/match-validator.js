const yup = require('yup');

const matchValidator = yup.object().shape({
    result:yup.string().trim().required().max(50),
    createdAt:yup.date().required(),
    updatedAt:yup.date().required(),
    tournamentId:yup.number().integer().required(),
    playerWhiteId:yup.number().integer().required(),
    playerBlackId:yup.number().integer().required(),
    createdAt:yup.date(),
	updatedAt:yup.date()
})

module.exports = {matchValidator}