const jwt = require('jsonwebtoken');

const generateJWT = ({ id, pseudo, isAdmin }) => {
	return new Promise((resolve, reject) => {
		const data = { id, pseudo, isAdmin };
		const secret = process.env.JWT_SECRET;
		const options = {
			algorithm: 'HS512',
			expiresIn: '12h',
		};
		jwt.sign(data, secret, options, (error, token) => {
			if (error) {
				return reject(error);
			}
			const expire = new Date(jwt.decode(token).exp * (1 * 1000)).toISOString();
			resolve({ token, expire });
		});
	});
};

const decodeJWT = (token) => {
	if (!token) {
		return Promise.reject(new Error('Invalid JWT'));
	}
	return new Promise((resolve, reject) => {
		const secret = process.env.JWT_SECRET;
		jwt.verify(token, secret, {}, (error, payload) => {
			if (error) {
				return reject(error);
			}
			resolve({
				id: payload.id,
				pseudo: payload.pseudo,
				isAdmin: payload.isAdmin,
			});
		});
	});
};

module.exports = {
	generateJWT,
	decodeJWT,
};
