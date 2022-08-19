const { Request, Response } = require('express');
const db = require('../models');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../utils/jwt-utils');
const { ErrorResponse, NotFoundErrorResponse } = require('../response-schemas/error-schema');
const {
	SuccessObjectResponse,
	SuccessArrayResponse,
} = require('../response-schemas/success-schema');

const userController = {
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	getAll: async (req, res) => {
		const data = await db.User.findAndCountAll();
		return res.status(200).json(new SuccessArrayResponse(data.rows, data.count));
	},

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	get: async (req, res) => {
		const id = parseInt(req.params.id);
		const user = await db.User.findOne({
			where: { id },
		});
		if (!user) {
			return res.status(404).json(new NotFoundErrorResponse('User not found'));
		}
		return res.status(200).json(new SuccessObjectResponse(user));
	},

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	update: async (req, res) => {
		const id = parseInt(req.params.id);
		const dataTemp = req.validatedData;
		const hashedPassword = await bcrypt.hash(dataTemp.password, 10);
		const data = {
			pseudo: dataTemp.pseudo,
			email: dataTemp.email,
			password: hashedPassword,
			birthDate: dataTemp.birthDate,
			gender: dataTemp.gender,
			updatedAt: new Date(),
		};

		const updatedUser = await db.User.update(data, {
			where: { id },
			returning: true,
		});

		if (!updatedUser[1]) {
			return res.status(400).json(new ErrorResponse('BAD REQUEST'));
		}

		const token = await generateJWT({
			id: data.id,
			pseudo: data.pseudo,
			isAdmin: data.isAdmin,
			birthDate: data.birthDate,
			gender: data.gender,
			updatedAt: data.updatedAt,
		});

		return res.status(200).json(new SuccessObjectResponse(token));
	},

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	delete: async (req, res) => {
		const id = parseInt(req.params.id);
		const nbRow = await db.User.destroy({
			where: { id },
		});
		if (nbRow !== 1) {
			return res.status(404).json(new NotFoundErrorResponse('User not found'));
		}
		return res.sendStatus(204);
	},
};

module.exports = userController;
