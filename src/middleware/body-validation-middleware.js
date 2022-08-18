const { InvalidFieldErrorResponse } = require('../response-schemas/error-schema');

const bodyValidationUser = (yupValidator, errorCode = 422) => {
	return (req, res, next) => {
		yupValidator
			.validate(req.body, { abortEarly: false })
			.then((data) => {
				req.validatedData = data;
				next();
			})
			.catch((yupError) => {
				// console.log(yupError);
				const errors = yupError.inner.reduce((acc, error) => {
					const { path, message } = error;
					if (!acc.hasOwnProperty(path)) {
						acc[path] = [message];
					} else {
						acc[path].push(message);
					}
					return acc;
				}, {});
				console.log(errors);
				return res
					.status(422)
					.json(new InvalidFieldErrorResponse('DATA INVALID', errors, errorCode));
			});
	};
};

module.exports = bodyValidationUser
