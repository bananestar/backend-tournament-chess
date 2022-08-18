const { Request, Response } = require('express');
const db = require('../models');
const { ErrorResponse, NotFoundErrorResponse } = require('../response-schemas/error-schema');
const {
	SuccessObjectResponse,
	SuccessArrayResponse,
} = require('../response-schemas/success-schema');

const matchController = {

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	getAll: async (req, res) => {
        const data = await db.Match.findAndCountAll();
		return res.status(200).json(new SuccessArrayResponse(data.rows, data.count));
    },

    /**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	get: async (req, res) => {
		const id = parseInt(req.params.id);
		const match = await db.Match.findOne({
			where: { id },
		});
		if (!match) {
			return res.status(404).json(new NotFoundErrorResponse('Match not found'));
		}
		return res.status(200).json(new SuccessObjectResponse(match));
	},

    /**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	 add: async (req, res) => {
		const data = req.validatedData;
		const newMatch = await db.Match.create(data);
		return res.status(201).json(new SuccessObjectResponse(newMatch, 201));
	},

    /**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	 update: async (req, res) => {
		const id = parseInt(req.params.id);
		const data = req.validatedData;

		const updatedMatch = await db.Match.update(data, {
			where: { id },
			returning: true,
		});

		if (!updatedMatch[1]) {
			return res.status(400).json(new ErrorResponse('BAD REQUEST'));
		}

		const updateValue = await db.Match.findOne({ where: { id } });
		return res.status(200).json(new SuccessObjectResponse(updateValue));
	},

    /**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	delete: async (req, res) => {
		const id = parseInt(req.params.id);
		const nbRow = await db.Match.destroy({
			where: { id },
		});
		if (nbRow !== 1) {
			return res.status(404).json(new NotFoundErrorResponse('Match not found'));
		}
		return res.sendStatus(204);
	},
};
module.exports = matchController;
