const { Op } = require('sequelize');
const db = require('../models');
const { decodeJWT } = require('../utils/jwt-utils');

const authJWT = (options = { adminRight: false }) => {
	return async (req, res, next) => {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];

		let tokenData;

		if (!token) {
			return res.sendStatus(401);
		}

		try {
			tokenData = await decodeJWT(token);
		} catch (error) {
			return res.sendStatus(403);
		}

		if (options.adminRight) {
			const admin = await db.Player.findOne({
				where: {
					[Op.and]: [{ id: tokenData.id }, { isAdmin: true }],
				},
			});

			if (!admin) {
				return res.sendStatus(403);
			}
		}

		req.player = tokenData;

		next();
	};
};

module.exports = authJWT