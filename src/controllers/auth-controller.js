const { Request, Response } = require('express');
const db = require('../models');
const bcrypt = require('bcrypt');
const { SuccessObjectResponse } = require('../response-schemas/success-schema');
const { Op } = require('sequelize');
const { ErrorResponse } = require('../response-schemas/error-schema');
const { generateJWT, decodeJWT } = require('../utils/jwt-utils');
const { SendNewUser, SendResetPassword } = require('../mails/sendEmail');
const authController = {
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	register: async (req, res) => {
		const { pseudo, email, birthDate, gender,elo } = req.body;
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const user = await db.User.create({
			pseudo,
			email,
			password: hashedPassword,
			birthDate,
			gender,
			elo
		});

		const token = await generateJWT({
			id: user.id,
			pseudo: user.pseudo,
			isAdmin: user.isAdmin,
			birthDate: user.birthDate,
			gender: user.gender,
		});

		SendNewUser(email, pseudo);
		return res.json(new SuccessObjectResponse(token));
	},

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	login: async (req, res) => {
		const { identifier, password } = req.body;
		const user = await db.User.findOne({
			where: {
				[Op.or]: [
					{
						pseudo: identifier,
					},
					{
						email: identifier,
					},
				],
			},
		});

		if (!user) {
			return res.status(422).json(new ErrorResponse('Bad Credentials', 422));
		}

		const isPasswordSame = await bcrypt.compare(password, user.password);

		if (!isPasswordSame) {
			return res.status(422).json(new ErrorResponse('Bad Credentials', 422));
		}

		const token = await generateJWT({
			id: user.id,
			pseudo: user.pseudo,
			isAdmin: user.isAdmin,
		});

		return res.json(new SuccessObjectResponse(token));
	},

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	resetPasswordMail: async (req, res) => {
		const { email } = req.body;
		const searchEmail = await db.User.findOne({
			where: {
				email: email,
			},
		});
		if (!searchEmail) {
			return res.status(422).json(new ErrorResponse('EMAIL NOT FOUND', 422));
		}

		const token = await generateJWT({
			id: searchEmail.id,
			pseudo: searchEmail.pseudo,
			isAdmin: searchEmail.isAdmin,
		});

		SendResetPassword(email);
		return res.json(new SuccessObjectResponse(token));
	},

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	resetPassword: async (req, res) => {
		const { password, email } = req.body;
		const token = req.headers.authorization.substring(7, req.headers.authorization.length);

		if (!password) {
			return res.status(422).json(new ErrorResponse('ERROR', 422));
		}
		if (!email) {
			return res.status(422).json(new ErrorResponse('ERROR', 422));
		}
		if (!token) {
			return res.status(422).json(new ErrorResponse('ERROR', 422));
		}

		const verifToken = await decodeJWT(token);

		if (!verifToken) {
			return res.status(422).json(new ErrorResponse('ERROR', 422));
		}

		const { id, pseudo, isAdmin } = await db.User.findOne({
			where: {
				email: email,
			},
		});

		if (!id) {
			return res.status(422).json(new ErrorResponse('ERROR', 422));
		}

		const data = {
			password: await bcrypt.hash(password, 10),
		};

		const user = await db.User.update(data, {
			where: { id },
			returning: true,
		});

		if (!user) {
			return res.status(422).json(new ErrorResponse('ERROR', 422));
		}

		const newtoken = await generateJWT({
			id: user.id,
			pseudo: user.pseudo,
			isAdmin: user.isAdmin,
		});

		return res.json(new SuccessObjectResponse(newtoken));
	},
};

module.exports = authController;
