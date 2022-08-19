const { faker } = require('@faker-js/faker');
const { Request, Response } = require('express');
const { SuccessObjectResponse } = require('../response-schemas/success-schema');
const db = require('../models');
const bcrypt = require('bcrypt');

const seedController = {
	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	AddUser: async (req, res) => {
		const hashedPassword = await bcrypt.hash('test1234=', 10);
		const gender = Math.random() < 0.5 ? 'male' : 'female';
		const firstName = faker.name.firstName(gender);
		const lastName = faker.name.lastName(gender);

		const data = {
			pseudo: faker.internet.userName(firstName, lastName),
			email: faker.internet.email(firstName, lastName),
			password: hashedPassword,
			birthDate: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
			gender: gender.toUpperCase(),
			elo: Math.floor(Math.random() * 3000),
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		return (newUser = await db.User.create(data));

		// return res(new SuccessObjectResponse(newUser, 201));
	},

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	AddTournament: async (req, res) => {
		const cityName = faker.address.cityName();
		const PlayersMax = Math.floor(Math.random() * (32 - 2)) + 2;
		const PlayersMin = Math.floor(Math.random() * (PlayersMax - 2)) + 2;
		const EloMax = Math.floor(Math.random() * 3000);
		const EloMin = Math.floor(Math.random() * EloMax);
		const category = ['junior', 'senior', 'veteran'];
		const date = new Date();
		const data = {
			name: `Tournament of ${cityName}`,
			location: `${faker.address.streetAddress()} , ${cityName}`,
			PlayersMin: PlayersMin,
			PlayersMax: PlayersMax,
			EloMin: EloMin,
			EloMax: EloMax,
			category: category[Math.floor(Math.random() * 2)],
			womenOnly: Math.random() < 0.5,
			canRegister: Math.random() < 0.5,
			registrationAt: new Date(date.setDate(date.getDate() + PlayersMax) * 1000),
			createdAt: date,
			updatedAt: date,
		};
		const newTournament = await db.Tournament.create(data);
		return res.json(new SuccessObjectResponse(newTournament, 201));
	},

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	AddMatch: async (req, res) => {
		const result = ['NotPlayed', 'WhiteWin', 'BlackWin', 'Draw'];
		const tournament = await db.Tournament.findAll({
			order: db.sequelize.random(),
			limit: 1,
		});
		const playerWhiteId = await db.User.findAll({
			order: db.sequelize.random(),
			limit: 1,
		});

		let playerBlackId;
		do {
			playerBlackId = await db.User.findAll({
				order: db.sequelize.random(),
				limit: 1,
			});
		} while (playerBlackId === playerWhiteId);

		const data = {
			result: result,
			createdAt: new Date(),
			updatedAt: new Date(),
			tournamentId: tournament.id,
			playerWhiteId: playerWhiteId.id,
			playerBlackId: playerBlackId.id,
		};

		const newMatch = await db.Match.create(data);
		return res.json(new SuccessObjectResponse(newMatch, 201));
	},
};

module.exports = seedController;
