const { faker } = require('@faker-js/faker');
const { Request, Response } = require('express');
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

		return await db.User.create(data);
	},

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	AddTournament: async (req, res) => {
		const cityName = faker.address.cityName();
		const PlayersMax = Math.floor(Math.random() * (32 - 2)) + 2;;
		const PlayersMin = Math.floor(Math.random() * (PlayersMax - 2)) + 2;
		const EloMax = Math.floor(Math.random() * 3000);
		const EloMin = Math.floor(Math.random() * EloMax);
		const category = ['junior', 'senior', 'veteran'];
		const statut = ['InProgress', 'Closed'];
		const date = new Date();
		const canRegister = Math.random() < 0.5;
		const data = {
			name: `Tournament of ${cityName}`,
			location: `${faker.address.streetAddress()} , ${cityName}`,
			PlayersMin: PlayersMin,
			PlayersMax: PlayersMax,
			EloMin: EloMin,
			EloMax: EloMax,
			category: category[Math.floor(Math.random() * 2)],
			womenOnly: Math.random() < 0.5,
			canRegister: canRegister,
			registrationAt: new Date(date.setDate(date.getDate() + PlayersMax)),
			statut: canRegister ? 'WaitingForPlayers' : statut[Math.floor(Math.random() * 1)],
			createdAt: date,
			updatedAt: date,
		};
		
		return await db.Tournament.create(data);
	},

	/**
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	AddMatch: async (req, res) => {
		const result = ['NotPlayed', 'WhiteWin', 'BlackWin', 'Draw'];
		const countUser = await db.User.count();
		let tournament;
		let playerWhiteId;
		let playerBlackId;

		try {
			const tournamentTemp = await db.Tournament.findAll({
				order: db.sequelize.random(),
				limit: 1,
			});

			const playerWhiteTemp = await db.User.findAll({
				order: db.sequelize.random(),
				limit: 1,
			});

			const playerBlackTemp = await db.User.findAll({
				order: db.sequelize.random(),
				limit: 1,
			});

			tournament = tournamentTemp[0].dataValues.id;
			playerWhiteId = playerWhiteTemp[0].dataValues.id;
			playerBlackId = playerBlackTemp[0].dataValues.id;

		} catch (error) {
			return error;
		}

		if (playerWhiteId === playerBlackId) {
			if (playerBlackId === countUser) {
				playerBlackId--;
			}else playerBlackId++
		}

		const data = {
			result: result[Math.floor(Math.random() * 3)],
			createdAt: new Date(),
			updatedAt: new Date(),
			tournamentId: tournament,
			playerWhiteId: playerWhiteId,
			playerBlackId: playerBlackId,
		};

		switch (data.result) {
			case 'NotPlayed':
				break;
			case 'WhiteWin':
				try {
					await db.User.update({ matchWin: +1 }, { where: { id: playerWhiteId } });
					await db.User.update({ matchLoose: +1 }, { where: { id: playerBlackId } });
				} catch (error) {
					return error;
				}
				break;
			case 'BlackWin':
				try {
					await db.User.update({ matchWin: +1 }, { where: { id: playerBlackId } });
					await db.User.update({ matchLoose: +1 }, { where: { id: playerWhiteId } });
				} catch (error) {
					return error;
				}
				break;
			case 'Draw':
				try {
					await db.User.update({ matchDraw: +1 }, { where: { id: playerWhiteId } });
					await db.User.update({ matchDraw: +1 }, { where: { id: playerBlackId } });
				} catch (error) {
					return error;
				}
				break;
			default:
				break;
		}

		const dataSubPLayer01 = {
			createdAt: new Date(),
			updatedAt: new Date(),
			tournamentId: tournament,
			userId: playerWhiteId,
		};
		const dataSubPLayer02 = {
			createdAt: new Date(),
			updatedAt: new Date(),
			tournamentId: tournament,
			userId: playerBlackId,
		};

		try {
			await db.Registration.create(dataSubPLayer01);
			await db.Registration.create(dataSubPLayer02);
		} catch (error) {
			return error;
		}

		return await db.Match.create(data);
	},
};

module.exports = seedController;
