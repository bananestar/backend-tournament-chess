const { Request, Response } = require('express');
const db = require('../models');

const { ErrorResponse, NotFoundErrorResponse } = require('../response-schemas/error-schema');
const {
	SuccessObjectResponse,
	SuccessArrayResponse,
} = require('../response-schemas/success-schema');

const playerController = {
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	getAll: async (req, res) => {
		const data = await db.Player.findAndCountAll();
		return res.status(200).json(new SuccessArrayResponse(data.rows, data.count));
	},

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	get: async (req, res) => {
		const id = parseInt(req.params.id);
		const player = await db.Player.findOne({
			where: { id },
		});
		if (!player) {
			return res.status(404).json(new NotFoundErrorResponse('Player not found'));
		}
		return res.status(200).json(new SuccessObjectResponse(player));
	},

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	add: async (req, res) => {
		const data = req.validatedData;
		const newPlayer = await db.Player.create(data);
		return res.status(201).json(new SuccessObjectResponse(newPlayer, 201));
	},

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	update: async (req, res) => {
		const id = parseInt(req.params.id);
		const data = req.validatedData;

		const updatedPlayer = await db.Player.update(data, {
			where: { id },
			returning: true,
		});

		if (!updatedPlayer[1]) {
			return res.status(400).json(new ErrorResponse('BAD REQUEST'));
		}

		const updateValue = await db.Player.findOne({ where: { id } });
		return res.status(200).json(new SuccessObjectResponse(updateValue));
	},

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	delete: async (req, res) => {
		const id = parseInt(req.params.id);
		const nbRow = await db.Player.destroy({
			where: { id },
		});
		if (nbRow !== 1) {
			return res.status(404).json(new NotFoundErrorResponse('Player not found'));
		}
		return res.sendStatus(204);
	},
};

module.exports = playerController;
